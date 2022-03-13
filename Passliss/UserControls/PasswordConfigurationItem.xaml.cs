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
using Passliss.Windows;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;

namespace Passliss.UserControls;

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

		if (PasswordConfiguration.IsDefault is null) // If there is no value
		{
			PasswordConfiguration.IsDefault = false; // Set to default
			Global.PasswordConfigurations[Global.PasswordConfigurations.IndexOf(PasswordConfiguration)] = PasswordConfiguration; // Update
			PasswordConfigurationManager.Save();
		}

		if (Global.DefaultPasswordConfiguration is not null && Global.PasswordConfigurations[Global.PasswordConfigurations.IndexOf(PasswordConfiguration)].IsDefault.Value)
		{
			FavBtn.Content = "\uF71B"; // Set text icon
		}
		else
		{
			FavBtn.Content = "\uF710"; // Set text icon
		}
	}

	private void Button_MouseEnter(object sender, MouseEventArgs e)
	{
		Button button = (Button)sender; // Create button

		button.Foreground = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["WindowButtonsHoverForeground1"].ToString()) }; // Set the foreground 
		DeleteBtn.Foreground = button.Foreground;
		FavBtn.Foreground = button.Foreground;
		EditBtn.Foreground = button.Foreground;
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
		FavBtn.Foreground = button.Foreground;
		EditBtn.Foreground = button.Foreground;
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

	private void FavBtn_Click(object sender, RoutedEventArgs e)
	{
		if (Global.DefaultPasswordConfiguration is not null)
		{
			if (Global.PasswordConfigurations[Global.PasswordConfigurations.IndexOf(PasswordConfiguration)].IsDefault.Value) // If is default
			{
				if (MessageBox.Show(Properties.Resources.UnsetPwrConfigMsg, Properties.Resources.Passliss, MessageBoxButton.YesNo, MessageBoxImage.Information) == MessageBoxResult.Yes)
				{
					Global.DefaultPasswordConfiguration = null; // Reset
					Global.PasswordConfigurations[Global.PasswordConfigurations.IndexOf(PasswordConfiguration)].IsDefault = false;
					FavBtn.Content = "\uF710"; // Set text icon
				}
			}
			else
			{
				if (MessageBox.Show(Properties.Resources.SetDefaultPwrConfigMsg, Properties.Resources.Passliss, MessageBoxButton.YesNo, MessageBoxImage.Information) == MessageBoxResult.Yes)
				{
					Global.DefaultPasswordConfiguration = PasswordConfiguration; // Reset
					Global.PasswordConfigurations.ForEach((PasswordConfiguration passwordConfiguration) => { passwordConfiguration.IsDefault = false; }); // Reset all
					Global.PasswordConfigurations[Global.PasswordConfigurations.IndexOf(PasswordConfiguration)].IsDefault = true;
					FavBtn.Content = "\uF71B"; // Set text icon
				}
			}
		}
		else
		{
			Global.DefaultPasswordConfiguration = PasswordConfiguration; // Reset
			Global.PasswordConfigurations[Global.PasswordConfigurations.IndexOf(PasswordConfiguration)].IsDefault = true;
			FavBtn.Content = "\uF71B"; // Set text icon
		}
		PasswordConfigurationManager.Save(); // Save changes
	}

	NewPasswordConfigurationWindow NewPasswordConfigurationWindow;
	private void EditBtn_Click(object sender, RoutedEventArgs e)
	{
		NewPasswordConfigurationWindow = new(PasswordConfiguration); // Create
		double factor = PresentationSource.FromVisual(this).CompositionTarget.TransformToDevice.M11; // Get factor for DPI

		NewPasswordConfigurationWindow.WindowStartupLocation = WindowStartupLocation.Manual; // Set the startup position to manual
		NewPasswordConfigurationWindow.Left = (PointToScreen(Mouse.GetPosition(this)).X - NewPasswordConfigurationWindow.Width / 2) / factor; // Calculate the X position
		NewPasswordConfigurationWindow.Top = PointToScreen(Mouse.GetPosition(this)).Y / factor - (10 + NewPasswordConfigurationWindow.Height); // Calculate the Y position
		NewPasswordConfigurationWindow.Show(); // Show
		NewPasswordConfigurationWindow.Focus();
	}
}
