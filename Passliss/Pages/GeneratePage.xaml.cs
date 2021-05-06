/*
MIT License

Copyright (c) Léo Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 
*/
using LeoCorpLibrary;
using Microsoft.Win32;
using Passliss.Classes;
using Passliss.Windows;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Passliss.Pages
{
	/// <summary>
	/// Logique d'interaction pour GeneratePage.xaml
	/// </summary>
	public partial class GeneratePage : Page
	{
		public GeneratePage()
		{
			InitializeComponent();

			LowerCaseChk.IsChecked = Global.Settings.PasswordPreset switch 
			{
				PasswordPresets.Simple => true,
				PasswordPresets.Complex => true,
				_ => true
			}; // Check the checkbox

			UpperCaseChk.IsChecked = Global.Settings.PasswordPreset switch
			{
				PasswordPresets.Simple => true,
				PasswordPresets.Complex => true,
				_ => true
			}; // Check the checkbox
			NumbersChk.IsChecked = Global.Settings.PasswordPreset switch
			{
				PasswordPresets.Simple => false,
				PasswordPresets.Complex => true,
				_ => false
			}; // Check the checkbox

			SpecialCaractersChk.IsChecked = Global.Settings.PasswordPreset switch
			{
				PasswordPresets.Simple => false,
				PasswordPresets.Complex => true,
				_ => false
			}; // Check the checkbox
			LenghtTxt.Text = Global.Settings.PasswordPreset switch
			{
				PasswordPresets.Simple => "15",
				PasswordPresets.Complex => "25",
				_ => "20"
			}; // Set text

			PasswordTxt.Text = Password.Generate(int.Parse(LenghtTxt.Text) + 1, Global.GetFinalCaracters(LowerCaseChk.IsChecked.Value, UpperCaseChk.IsChecked.Value, NumbersChk.IsChecked.Value, SpecialCaractersChk.IsChecked.Value), ","); // Generate

		}

		private void GenerateBtn_Click(object sender, RoutedEventArgs e)
		{
			LenghtTxt.Text = LenghtTxt.Text.Replace(" ", ""); // Remove whitespaces
			if (LenghtTxt.Text.Length <= 0 || !(int.Parse(LenghtTxt.Text) > 0))
			{
				MessageBox.Show(Properties.Resources.PleaseSpecifyLenghtMsg, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information); // Show message
				return;
			}

			if (!IsNoCheckboxesChecked())
			{
				PasswordTxt.Text = Password.Generate(int.Parse(LenghtTxt.Text) + 1, Global.GetFinalCaracters(LowerCaseChk.IsChecked.Value, UpperCaseChk.IsChecked.Value, NumbersChk.IsChecked.Value, SpecialCaractersChk.IsChecked.Value), ","); // Generate 
			}
			else
			{
				MessageBox.Show(Properties.Resources.PleaseSelectChkMsg, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information);
			}
		}

		/// <summary>
		/// True if all unchecked.
		/// </summary>
		/// <returns>A <see cref="bool"/> value.</returns>
		private bool IsNoCheckboxesChecked()
		{
			return (!LowerCaseChk.IsChecked.Value && !UpperCaseChk.IsChecked.Value && !NumbersChk.IsChecked.Value && !SpecialCaractersChk.IsChecked.Value);
		}

		private void LenghtTxt_PreviewTextInput(object sender, TextCompositionEventArgs e)
		{
			Regex regex = new("[^0-9]+");
			e.Handled = regex.IsMatch(e.Text);
		}

		private void CopyBtn_Click(object sender, RoutedEventArgs e)
		{
			Clipboard.SetText(PasswordTxt.Text); // Copy the password
		}

		LoadPasswordConfigurationWindow LoadPasswordConfigurationWindow = new(); // Create a LoadPasswordConfigurationWindow
		private void LoadPwrConfig_Click(object sender, RoutedEventArgs e)
		{
			double factor = PresentationSource.FromVisual(this).CompositionTarget.TransformToDevice.M11; // Get factor for DPI

			if (Global.PasswordConfigurations.Count > 0) // If there is Password Configurations (at least one)
			{
				NewPasswordConfigurationWindow.Hide(); // Hide the NewPasswordConfigurationWindow

				LoadPasswordConfigurationWindow.WindowStartupLocation = WindowStartupLocation.Manual; // Set the startup position to manual
				LoadPasswordConfigurationWindow.Left = (PointToScreen(Mouse.GetPosition(this)).X - LoadPasswordConfigurationWindow.Width / 2) / factor; // Calculate the X position
				LoadPasswordConfigurationWindow.Top = PointToScreen(Mouse.GetPosition(this)).Y / factor - (10 + LoadPasswordConfigurationWindow.Height); // Calculate the Y position
				LoadPasswordConfigurationWindow.InitUI(); // Refresh
				LoadPasswordConfigurationWindow.Show(); // Show
				LoadPasswordConfigurationWindow.Focus();
			}
			else
			{
				MessageBox.Show(Properties.Resources.NoPasswordConfigurations, Properties.Resources.PasswordConfigurations, MessageBoxButton.OK, MessageBoxImage.Exclamation);
			}
		}

		NewPasswordConfigurationWindow NewPasswordConfigurationWindow = new(); // Create a NewPasswordConfigurationWindow
		private void NewPwrConfig_Click(object sender, RoutedEventArgs e)
		{
			double factor = PresentationSource.FromVisual(this).CompositionTarget.TransformToDevice.M11; // Get factor for DPI

			LoadPasswordConfigurationWindow.Hide(); // Hide the LoadPasswordConfigurationWindow

			NewPasswordConfigurationWindow.WindowStartupLocation = WindowStartupLocation.Manual; // Set the startup position to manual
			NewPasswordConfigurationWindow.Left = (PointToScreen(Mouse.GetPosition(this)).X - NewPasswordConfigurationWindow.Width / 2) / factor; // Calculate the X position
			NewPasswordConfigurationWindow.Top = PointToScreen(Mouse.GetPosition(this)).Y / factor - (10 + NewPasswordConfigurationWindow.Height); // Calculate the Y position
			NewPasswordConfigurationWindow.Show(); // Show
			NewPasswordConfigurationWindow.Focus();
		}

		private void RandomizeLength_Click(object sender, RoutedEventArgs e)
		{
			Random random = new();
			LenghtTxt.Text = random.Next(10, 30).ToString();
		}

		private void ExportPwrConfig_Click(object sender, RoutedEventArgs e)
		{
			SaveFileDialog saveFileDialog = new()
			{
				FileName = $"{Properties.Resources.PasswordConfigurations}.xml",
				Title = Properties.Resources.Export,
				Filter = "XML Files|*.xml"
			}; // Create a SaveFileDialog

			if (saveFileDialog.ShowDialog() ?? true)
			{
				PasswordConfigurationManager.Export(Global.PasswordConfigurations, saveFileDialog.FileName); // Export
			}
		}

		private void ImportPwrConfig_Click(object sender, RoutedEventArgs e)
		{
			OpenFileDialog openFileDialog = new()
			{
				FileName = $"{Properties.Resources.PasswordConfigurations}.xml",
				Title = Properties.Resources.Import,
				Filter = "XML Files|*.xml"
			}; // Create a OpenFileDialog

			if (openFileDialog.ShowDialog() ?? true)
			{
				PasswordConfigurationManager.Import(openFileDialog.FileName); // Import
			}
		}
	}
}
