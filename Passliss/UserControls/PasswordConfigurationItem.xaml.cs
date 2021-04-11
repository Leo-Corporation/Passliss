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
using Passliss.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

namespace Passliss.UserControls
{
	/// <summary>
	/// Logique d'interaction pour PasswordConfigurationItem.xaml
	/// </summary>
	public partial class PasswordConfigurationItem : UserControl
	{
		PasswordConfiguration PasswordConfiguration { get; init; }

		public PasswordConfigurationItem(PasswordConfiguration passwordConfiguration)
		{
			InitializeComponent();

			PasswordConfiguration = passwordConfiguration; // Set value
			InitUI(); // Load UI
		}

		/// <summary>
		/// Loads the UI.
		/// </summary>
		private void InitUI()
		{
			NameTxt.Text = PasswordConfiguration.Name; // Display the name
		}

		private void Button_MouseEnter(object sender, MouseEventArgs e)
		{
			Button button = (Button)sender; // Create button

			button.Foreground = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["WindowButtonsHoverForeground1"].ToString()) }; // Set the foreground 
			DeleteBtn.Foreground = button.Foreground;
		}

		private void DeleteBtn_Click(object sender, RoutedEventArgs e)
		{
			Global.PasswordConfigurations.Remove(PasswordConfiguration); // Remove the item
			Global.LoadPasswordConfigurationWindow.InitUI(); // Refresh the list
			PasswordConfigurationManager.Save(); // Save the changes
			return;
		}

		private void Button_MouseLeave(object sender, MouseEventArgs e)
		{
			Button button = (Button)sender; // Create button

			button.Foreground = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["Foreground1"].ToString()) }; // Set the foreground 
			DeleteBtn.Foreground = button.Foreground;
		}

		private void ItemBtn_Click(object sender, RoutedEventArgs e)
		{
			Global.GeneratePage.LenghtTxt.Text = PasswordConfiguration.Length; // Set value
			Global.GeneratePage.LowerCaseChk.IsChecked = PasswordConfiguration.UseLowerCase; // Check
			Global.GeneratePage.UpperCaseChk.IsChecked = PasswordConfiguration.UseUpperCase; // Check
			Global.GeneratePage.NumbersChk.IsChecked = PasswordConfiguration.UseNumbers; // Check
			Global.GeneratePage.SpecialCaractersChk.IsChecked = PasswordConfiguration.UseSpecialCaracters; // Check
		}

		private void NameTxt_MouseDown(object sender, MouseButtonEventArgs e)
		{
			if (e.LeftButton == MouseButtonState.Pressed)
			{
				Global.GeneratePage.LenghtTxt.Text = PasswordConfiguration.Length; // Set value
				Global.GeneratePage.LowerCaseChk.IsChecked = PasswordConfiguration.UseLowerCase; // Check
				Global.GeneratePage.UpperCaseChk.IsChecked = PasswordConfiguration.UseUpperCase; // Check
				Global.GeneratePage.NumbersChk.IsChecked = PasswordConfiguration.UseNumbers; // Check
				Global.GeneratePage.SpecialCaractersChk.IsChecked = PasswordConfiguration.UseSpecialCaracters; // Check
				Global.LoadPasswordConfigurationWindow.Hide(); // Hide the parent window
			}
		}
	}
}
