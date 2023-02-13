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
using Passliss.Enums;
using Passliss.UserControls;
using Passliss.Windows;
using PeyrSharp.Core;
using PeyrSharp.Enums;
using System;
using System.Text.RegularExpressions;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace Passliss.Pages;

/// <summary>
/// Logique d'interaction pour GeneratePage.xaml
/// </summary>
public partial class GeneratePage : Page
{
	string password = "";
	public GeneratePage()
	{
		InitializeComponent();
		InitUI();
	}
	private async void InitUI()
	{
		// Set special characters in Global
		Global.SpecialCaracters = Global.Settings.UseSimpleSpecialChars ?? false ? ";,:,!,/,*,$,%,),=,+,-,',(,_,<,>,?" : Global.SpecialCaracters;
		OtherCharactersTxt.Text = Global.Settings.SaveCustomChars ?? true ? Global.Settings.CustomUserChars : "";

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

		PasswordTxt.Text = StrengthGrid.Visibility == Visibility.Collapsed
			? await Password.GenerateAsync(int.Parse(LenghtTxt.Text) + 1, Global.GetFinalCaracters(LowerCaseChk.IsChecked.Value, UpperCaseChk.IsChecked.Value, NumbersChk.IsChecked.Value, SpecialCaractersChk.IsChecked.Value) + OtherCharactersTxt.Text, ",")
			: await Global.GeneratePasswordByStrength((PasswordStrength)(3 - StrengthSlider.Value)); // Generate 
		password = PasswordTxt.Text;
		if (!Global.Settings.DisableHistory.Value)
		{
			PasswordHistory.Children.Add(new PasswordHistoryItem(PasswordTxt.Text, PasswordHistory)); // Add to history 
		}
		else
		{
			HistoryBtn.Visibility = Visibility.Collapsed; // Set visibility
		}
		UpdateStrengthIcon(); // Update the icon


	}

	internal void InitPopupUI()
	{
		ItemDisplayer.Children.Clear(); // Clear items

		for (int i = 0; i < Global.PasswordConfigurations.Count; i++)
		{
			ItemDisplayer.Children.Add(new PasswordConfigurationItem(Global.PasswordConfigurations[i])); // Add item
		}

		if (!IsEditMode)
		{
			NameTxt.Text = Properties.Resources.PasswordConfigurations + $"{Global.PasswordConfigurations.Count + 1}"; // Set the name
			PLowerCaseChk.IsChecked = true; // Check the checkbox
			PUpperCaseChk.IsChecked = true; // Check the checkbox
			PNumbersChk.IsChecked = true; // Check the checkbox

			PLenghtTxt.Text = "20";
		}
		else
		{
			NameTxt.Text = PasswordConfiguration.Name; // Set text
			PLowerCaseChk.IsChecked = PasswordConfiguration.UseLowerCase; // Set
			PUpperCaseChk.IsChecked = PasswordConfiguration.UseUpperCase; // Set
			PNumbersChk.IsChecked = PasswordConfiguration.UseNumbers; // Set
			PSpecialCaractersChk.IsChecked = PasswordConfiguration.UseSpecialCaracters; // Set

			PLenghtTxt.Text = PasswordConfiguration.Length; // Set
		}
	}

	private async void GenerateBtn_Click(object sender, RoutedEventArgs e)
	{
		LenghtTxt.Text = LenghtTxt.Text.Replace(" ", ""); // Remove whitespaces
		if (!Global.Settings.DisableHistory.Value)
		{
			HistoryBtn.Visibility = Visibility.Visible; // Set visibility 
		}
		else
		{
			HistoryBtn.Visibility = Visibility.Collapsed; // Set visibility
		}

		if (LenghtTxt.Text.Length <= 0 || !(int.Parse(LenghtTxt.Text) > 0))
		{
			MessageBox.Show(Properties.Resources.PleaseSpecifyLenghtMsg, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information); // Show message
			return;
		}

		if (!IsNoCheckboxesChecked())
		{
			PasswordTxt.Text = StrengthGrid.Visibility == Visibility.Collapsed 
				? await Password.GenerateAsync(int.Parse(LenghtTxt.Text) + 1, Global.GetFinalCaracters(LowerCaseChk.IsChecked.Value, UpperCaseChk.IsChecked.Value, NumbersChk.IsChecked.Value, SpecialCaractersChk.IsChecked.Value) + OtherCharactersTxt.Text, ",")
				: await Global.GeneratePasswordByStrength((PasswordStrength)(3 - StrengthSlider.Value)); // Generate 
			password = PasswordTxt.Text;

			if (!Global.Settings.DisableHistory.Value)
			{
				PasswordHistory.Children.Add(new PasswordHistoryItem(PasswordTxt.Text, PasswordHistory)); // Add to history 
			}

			UpdateStrengthIcon(); // Update the icon
			string text = "";
			for (int i = 0; i < password.Length; i++) text += "•";

			PasswordTxt.Text = Global.IsConfidentialModeEnabled ? text : password;
		}
		else
		{
			MessageBox.Show(Properties.Resources.PleaseSelectChkMsg, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information);
		}
	}

	private void UpdateStrengthIcon()
	{
		// Set the Strength icon
		var strength = Global.GetPasswordStrenght(PasswordTxt.Text); // Get strenght
		TestStrengthBtn.Content = strength switch
		{
			PasswordStrenght.VeryGood => "\uF6EA", // If the password strenght is very good
			PasswordStrenght.Good => "\uF299", // If the password strenght is good
			PasswordStrenght.Medium => "\uF882", // If the password strenght is medium
			PasswordStrenght.Low => "\uF36E", // If the password strenght is low
			_ => "\uF4AB" // If the password strenght is unknown
		};

		TestStrengthBtn.Foreground = Global.GetStrenghtColorBrush(strength); // Set color
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

	private void LoadPwrConfig_Click(object sender, RoutedEventArgs e)
	{
		InitPopupUI();
		PasswordConfigPopup.IsOpen = true;
	}

	private void RandomizeLength_Click(object sender, RoutedEventArgs e)
	{
		Random random = new();
		LenghtTxt.Text = random.Next(Global.Settings.MinRandomLength.Value, Global.Settings.MaxRandomLength.Value).ToString();
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

					HistoryBtn.Content = "\uF36A"; // Set text
					for (int i = 0; i < PasswordHistory.Children.Count; i++)
					{
						if (PasswordHistory.Children[i] is PasswordHistoryItem passwordHistoryItem)
						{
							passwordHistoryItem.HideOrShowPasswordInPlainText(!Global.IsConfidentialModeEnabled); // Show or hide password
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
	internal void ToggleConfidentialMode()
	{
		for (int i = 0; i < PasswordHistory.Children.Count; i++)
		{
			if (PasswordHistory.Children[i] is PasswordHistoryItem passwordHistoryItem)
			{
				passwordHistoryItem.HideOrShowPasswordInPlainText(!Global.IsConfidentialModeEnabled); // Show or hide password
			}
		}
		string text = "";
		for (int i = 0; i < password.Length; i++) text += "•";

		PasswordTxt.Text = Global.IsConfidentialModeEnabled ? text : password;
	}

	public MainWindow MainWindow { get; set; }
	private void TestStrengthBtn_Click(object sender, RoutedEventArgs e)
	{
		Global.StrenghtPage.PasswordTxt.Text = password; // Set text
		Global.StrenghtPage.PasswordPwrBox.Password = password; // Set text
		Global.StrenghtPage.InitSeeMoreUI(Global.IsConfidentialModeEnabled); // Init UI

		MainWindow.StrenghtTabBtn_Click(this, null);
	}

	private void GeneratePwrsBtn_Click(object sender, RoutedEventArgs e)
	{
		MultiplePasswordsPopup.IsOpen = true;
	}

	private async void GeneratePasswordsBtn_Click(object sender, RoutedEventArgs e)
	{
		if (string.IsNullOrEmpty(PasswordAmountTxt.Text))
		{
			MessageBox.Show(Properties.Resources.ProvideNumPasswordsMsg, Properties.Resources.GenerateMultiplePasswords, MessageBoxButton.OK, MessageBoxImage.Warning);
			return;
		}

		var passwords = StrengthGrid.Visibility == Visibility.Collapsed ? await Password.GenerateAsync(int.Parse(PasswordAmountTxt.Text), int.Parse(LenghtTxt.Text) + 1, Global.GetFinalCaracters(LowerCaseChk.IsChecked.Value, UpperCaseChk.IsChecked.Value, NumbersChk.IsChecked.Value, SpecialCaractersChk.IsChecked.Value) + OtherCharactersTxt.Text, ",")
			: await Global.GeneratePasswordByStrength(int.Parse(PasswordAmountTxt.Text), (PasswordStrength)(3 - StrengthSlider.Value));
		new SeeFullPassword(passwords).Show();
		MultiplePasswordsPopup.IsOpen = false;
	}

	private void PRandomizeLength_Click(object sender, RoutedEventArgs e)
	{
		Random random = new();
		PLenghtTxt.Text = random.Next(Global.Settings.MinRandomLength.Value, Global.Settings.MaxRandomLength.Value).ToString();
	}

	private void NewBtn_Click(object sender, RoutedEventArgs e)
	{
		LoadGrid.Visibility = Visibility.Collapsed;
		NewGrid.Visibility = Visibility.Visible;
		IsEditMode = false;
	}
	internal PasswordConfiguration PasswordConfiguration { get; set; }
	internal bool IsEditMode { get; set; }

	private bool PIsNoCheckboxesChecked()
	{
		return (!PLowerCaseChk.IsChecked.Value && !PUpperCaseChk.IsChecked.Value && !PNumbersChk.IsChecked.Value && !PSpecialCaractersChk.IsChecked.Value);
	}
	private void SaveBtn_Click(object sender, RoutedEventArgs e)
	{
		// Check if the provided length is correct
		PLenghtTxt.Text = PLenghtTxt.Text.Replace(" ", ""); // Remove whitespaces to avoid errors
		if (PLenghtTxt.Text.Length <= 0 || !(int.Parse(PLenghtTxt.Text) > 0))
		{
			MessageBox.Show(Properties.Resources.PleaseSpecifyLenghtMsg, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information); // Show message
			return;
		}

		if (!PIsNoCheckboxesChecked())
		{
			if (!IsEditMode)
			{
				Global.PasswordConfigurations.Add(new PasswordConfiguration
				{
					UseLowerCase = PLowerCaseChk.IsChecked.Value, // Set value
					UseNumbers = PNumbersChk.IsChecked.Value, // Set value
					UseSpecialCaracters = PSpecialCaractersChk.IsChecked.Value, // Set value
					UseUpperCase = PUpperCaseChk.IsChecked.Value, // Set value
					Length = PLenghtTxt.Text, // Set value
					Name = NameTxt.Text // Set value
				});
			}
			else
			{
				Global.PasswordConfigurations[Global.PasswordConfigurations.IndexOf(PasswordConfiguration)] = new()
				{
					UseLowerCase = PLowerCaseChk.IsChecked.Value, // Set value
					UseNumbers = PNumbersChk.IsChecked.Value, // Set value
					UseSpecialCaracters = PSpecialCaractersChk.IsChecked.Value, // Set value
					UseUpperCase = PUpperCaseChk.IsChecked.Value, // Set value
					Length = PLenghtTxt.Text, // Set value
					Name = NameTxt.Text, // Set value
					IsDefault = PasswordConfiguration.IsDefault
				};
			}

			PasswordConfigurationManager.Save(); // Save the changes
		}
		else
		{
			MessageBox.Show(Properties.Resources.PleaseSelectChkMsg, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information);
		}

		LoadGrid.Visibility = Visibility.Visible;
		NewGrid.Visibility = Visibility.Collapsed;
		InitPopupUI();
	}

	private void BackBtn_Click(object sender, RoutedEventArgs e)
	{
		LoadGrid.Visibility = Visibility.Visible;
		NewGrid.Visibility = Visibility.Collapsed;
	}

	private void StrengthSlider_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
	{
		PasswordStrenght strenght = StrengthSlider.Value switch
		{
			0 => PasswordStrenght.Low,
			1 => PasswordStrenght.Medium,
			2 => PasswordStrenght.Good,
			3 => PasswordStrenght.VeryGood,
			_ => PasswordStrenght.Unknown
		};

		IconTxt.Text = Global.GetStrenghtCaracter(strenght); // Get text
		IconTxt.Foreground = Global.GetStrenghtColorBrush(strenght); // Get the color
		CommentTxt.Text = Global.GetStrenghtText(strenght); // Get text

	}
}
