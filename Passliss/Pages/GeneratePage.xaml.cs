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
using Passliss.UserControls;
using Passliss.Windows;
using System;
using System.Text.RegularExpressions;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

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

			for (int i = 0; i < Global.PasswordConfigurations.Count; i++)
			{
				if (Global.PasswordConfigurations[i].IsDefault.Value)
				{
					Global.DefaultPasswordConfiguration = Global.PasswordConfigurations[i];
					break;
				}
				else
				{
					Global.DefaultPasswordConfiguration = null; // Set to null
				}
			}

			if (Global.DefaultPasswordConfiguration is not null)
			{
				LowerCaseChk.IsChecked = Global.DefaultPasswordConfiguration.UseLowerCase; // Set value
				UpperCaseChk.IsChecked = Global.DefaultPasswordConfiguration.UseUpperCase; // Set value
				NumbersChk.IsChecked = Global.DefaultPasswordConfiguration.UseNumbers; // Set value
				SpecialCaractersChk.IsChecked = Global.DefaultPasswordConfiguration.UseSpecialCaracters; // Set value
				LenghtTxt.Text = Global.DefaultPasswordConfiguration.Length; // Set text 
			}
			else
			{
				LowerCaseChk.IsChecked = true; // Set value
				UpperCaseChk.IsChecked = true; // Set value
				NumbersChk.IsChecked = true; // Set value
				SpecialCaractersChk.IsChecked = false; // Set value
			}

			if (Global.Settings.UseRandomPasswordLengthOnStart.Value)
			{
				Random random = new();
				LenghtTxt.Text = random.Next(Global.Settings.MinRandomLength.Value, Global.Settings.MaxRandomLength.Value).ToString();
			}

			PasswordTxt.Text = Password.Generate(int.Parse(LenghtTxt.Text) + 1, Global.GetFinalCaracters(LowerCaseChk.IsChecked.Value, UpperCaseChk.IsChecked.Value, NumbersChk.IsChecked.Value, SpecialCaractersChk.IsChecked.Value), ","); // Generate
			PasswordHistory.Children.Add(new PasswordHistoryItem(PasswordTxt.Text, PasswordHistory)); // Add to history
		}

		private void GenerateBtn_Click(object sender, RoutedEventArgs e)
		{
			LenghtTxt.Text = LenghtTxt.Text.Replace(" ", ""); // Remove whitespaces
			HistoryBtn.Visibility = Visibility.Visible; // Set visibility
			if (LenghtTxt.Text.Length <= 0 || !(int.Parse(LenghtTxt.Text) > 0))
			{
				MessageBox.Show(Properties.Resources.PleaseSpecifyLenghtMsg, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information); // Show message
				return;
			}

			if (!IsNoCheckboxesChecked())
			{
				PasswordTxt.Text = Password.Generate(int.Parse(LenghtTxt.Text) + 1, Global.GetFinalCaracters(LowerCaseChk.IsChecked.Value, UpperCaseChk.IsChecked.Value, NumbersChk.IsChecked.Value, SpecialCaractersChk.IsChecked.Value), ","); // Generate 
				PasswordHistory.Children.Add(new PasswordHistoryItem(PasswordTxt.Text, PasswordHistory)); // Add to history
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
			LenghtTxt.Text = random.Next(Global.Settings.MinRandomLength.Value, Global.Settings.MaxRandomLength.Value).ToString();
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

		internal void HistoryBtn_Click(object sender, RoutedEventArgs e)
		{
			if (PasswordHistory.Children.Count > 0)
			{
				HistoryBtn.Visibility = Visibility.Visible; // Set visibility
				if (sender is not PasswordHistoryItem)
				{
					if (Header.Visibility == Visibility.Visible)
					{
						Header.Visibility = Visibility.Collapsed; // Hide
						Content.Visibility = Visibility.Collapsed; // Hide
						ExportBar.Visibility = Visibility.Collapsed; // Hide

						PasswordHistory.Visibility = Visibility.Visible; // Show
						HistoryScroll.Visibility = Visibility.Visible; // Show
						HidePasswordBtn.Visibility = Visibility.Visible; // Show

						HistoryBtn.Content = "\uF36A"; // Set text
						for (int i = 0; i < PasswordHistory.Children.Count; i++)
						{
							if (PasswordHistory.Children[i] is PasswordHistoryItem passwordHistoryItem)
							{
								passwordHistoryItem.HideOrShowPasswordInPlainText(showPassword); // Show or hide password
							}
						}
					}
					else
					{
						Header.Visibility = Visibility.Visible; // Show
						Content.Visibility = Visibility.Visible; // Show
						ExportBar.Visibility = Visibility.Visible; // Show

						PasswordHistory.Visibility = Visibility.Collapsed; // Hide
						HistoryScroll.Visibility = Visibility.Collapsed; // Hide
						HidePasswordBtn.Visibility = Visibility.Collapsed; // Hide

						HistoryBtn.Content = "\uF47F"; // Set text
					}
				}
			}
			else
			{
				Header.Visibility = Visibility.Visible; // Show
				Content.Visibility = Visibility.Visible; // Show
				ExportBar.Visibility = Visibility.Visible; // Show

				PasswordHistory.Visibility = Visibility.Collapsed; // Hide
				HistoryScroll.Visibility = Visibility.Collapsed; // Hide

				HistoryBtn.Content = "\uF47F"; // Set text
				HistoryBtn.Visibility = Visibility.Collapsed; // Set visibility
				HidePasswordBtn.Visibility = Visibility.Collapsed; // Hide
				if (sender is not PasswordHistoryItem)
				{
					MessageBox.Show(Properties.Resources.HistoryEmpty, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information); // Show
				}
			}
		}

		private void RandomizeBtn_Click(object sender, RoutedEventArgs e)
		{
			Random random = new();
			LowerCaseChk.IsChecked = random.Next(0, 2) == 0; // Randomize
			UpperCaseChk.IsChecked = random.Next(0, 2) == 0; // Randomize
			NumbersChk.IsChecked = random.Next(0, 2) == 0; // Randomize
			SpecialCaractersChk.IsChecked = random.Next(0, 2) == 0; // Randomize
			LenghtTxt.Text = random.Next(Global.Settings.MinRandomLength.Value, Global.Settings.MaxRandomLength.Value).ToString();
		}

		private void ShowFullPasswordBtn_Click(object sender, RoutedEventArgs e)
		{
			new SeeFullPassword(PasswordTxt.Text).Show(); // Show the window
		}

		bool showPassword = !Global.Settings.AlwaysHidePasswordInHistory.Value;
		private void HidePasswordBtn_Click(object sender, RoutedEventArgs e)
		{
			showPassword = !showPassword; // Update
			HidePasswordBtn.Content = showPassword ? "\uF3F8" : "\uF3FC"; // Set icon text

			for (int i = 0; i < PasswordHistory.Children.Count; i++)
			{
				if (PasswordHistory.Children[i] is PasswordHistoryItem passwordHistoryItem)
				{
					passwordHistoryItem.HideOrShowPasswordInPlainText(showPassword); // Show or hide password
				}
			}
		}
	}
}
