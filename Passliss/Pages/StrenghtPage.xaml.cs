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
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Media;

namespace Passliss.Pages;

/// <summary>
/// Logique d'interaction pour StrenghtPage.xaml
/// </summary>
public partial class StrenghtPage : Page
{
	public StrenghtPage()
	{
		InitializeComponent();
		InitUI(); // Load the UI
	}

	private void InitUI()
	{
		ToggleConfidentialMode();

		SeeMoreBtn.MouseEnter += (o, e) => SeeMoreBtn.Foreground = new SolidColorBrush { Color = Color.FromRgb(255, 255, 255) };
		SeeMoreBtn.MouseLeave += (o, e) => SeeMoreBtn.Foreground = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(Application.Current.Resources["Foreground1"].ToString()) };
	}

	private static string GetStrenghtCaracter(PasswordStrenght passwordStrenght)
	{
		return passwordStrenght switch
		{
			PasswordStrenght.VeryGood => "\uF6EA", // If the password strenght is very good
			PasswordStrenght.Good => "\uF299", // If the password strenght is good
			PasswordStrenght.Medium => "\uF882", // If the password strenght is medium
			PasswordStrenght.Low => "\uF36E", // If the password strenght is low
			_ => "\uF4AB" // If the password strenght is unknown
		};
	}

	private static string GetStrenghtText(PasswordStrenght passwordStrenght)
	{
		return passwordStrenght switch
		{
			PasswordStrenght.VeryGood => Properties.Resources.StrenghtVeryGood, // If the password strenght is very good
			PasswordStrenght.Good => Properties.Resources.StrenghtGood, // If the password strenght is good
			PasswordStrenght.Medium => Properties.Resources.StrenghtMedium, // If the password strenght is medium
			PasswordStrenght.Low => Properties.Resources.StrenghtLow, // If the password strenght is low
			_ => Properties.Resources.EnterPassword // If the password strenght is unknown
		};
	}

	internal void PasswordTxt_TextChanged(object sender, TextChangedEventArgs e)
	{
		PasswordStrenght password = Global.GetPasswordStrenght(PasswordTxt.Text); // Get strenght

		IconTxt.Text = GetStrenghtCaracter(password); // Get text
		CommentTxt.Text = GetStrenghtText(password); // Get text

		IconTxt.Foreground = Global.GetStrenghtColorBrush(password); // Get the color

		SeeMoreBtn.Visibility = PasswordTxt.Text.Length > 0 ? Visibility.Visible : Visibility.Collapsed; // Change visibility
	}

	internal void ToggleConfidentialMode()
	{
		if (Global.IsConfidentialModeEnabled)
		{
			PasswordPwrBox.Visibility = Visibility.Visible; // Change the visibility
			PasswordTxt.Visibility = Visibility.Hidden; // Change the visibility
			PasswordPwrBox.Password = PasswordTxt.Text; // Set text
		}
		else
		{
			PasswordPwrBox.Visibility = Visibility.Hidden; // Change the visibility
			PasswordTxt.Visibility = Visibility.Visible; // Change the visibility
			PasswordTxt.Text = PasswordPwrBox.Password; // Set text
		}
		InitSeeMoreUI(Global.IsConfidentialModeEnabled);
	}

	private void PasswordPwrBox_PasswordChanged(object sender, RoutedEventArgs e)
	{
		PasswordStrenght password = Global.GetPasswordStrenght(PasswordPwrBox.Password); // Get strenght

		IconTxt.Text = GetStrenghtCaracter(password); // Get text
		CommentTxt.Text = GetStrenghtText(password); // Get text

		IconTxt.Foreground = Global.GetStrenghtColorBrush(password); // Get the color

		SeeMoreBtn.Visibility = PasswordPwrBox.Password.Length > 0 ? Visibility.Visible : Visibility.Collapsed; // Change visibility
	}

	internal void InitSeeMoreUI(bool t)
	{
		List<ColorSyntaxItem> colorItems = new(); // Create a new list
		SeeMorePasswordTxt.Inlines.Clear(); // Clear the text

		int numbers = 0;
		int specialCharacters = 0;
		int lowerCaseLetters = 0;
		int upperCaseLetters = 0;
		foreach (char c in t ? PasswordPwrBox.Password : PasswordTxt.Text)
		{
			if (char.IsUpper(c) && !Global.SpecialCaracters.Contains(c)) // Get number of upper case letters in password
			{
				upperCaseLetters++;
				colorItems.Add(new(t ? '•' : c, Global.GetColorFromResource("Red"))); // Add to dictionary
			}

			if (char.IsLower(c) && !Global.SpecialCaracters.Contains(c)) // Get number of lower case letters in password
			{
				lowerCaseLetters++;
				colorItems.Add(new(t ? '•' : c, Global.GetColorFromResource("Blue"))); // Add to dictionary
			}

			if (char.IsNumber(c)) // Get number of numbers in password
			{
				numbers++;
				colorItems.Add(new(t ? '•' : c, Global.GetColorFromResource("Green"))); // Add to dictionary
			}

			if (char.IsPunctuation(c) || char.IsSymbol(c) || Global.SpecialCaracters.Contains(c)) // Get number of special characters in password
			{
				specialCharacters++;
				colorItems.Add(new(t ? '•' : c, Global.GetColorFromResource("Purple"))); // Add to dictionary
			}
		}

		// Display informations to the user
		UpperCaseTxt.Text = upperCaseLetters.ToString(); // Set text
		LowerCaseTxt.Text = lowerCaseLetters.ToString(); // Set text
		NumbersTxt.Text = numbers.ToString(); // Set text
		SpecialCharsTxt.Text = specialCharacters.ToString(); // Set text
		LengthTxt.Text = PasswordTxt.Text.Length.ToString(); // Get length

		// Create color syntax
		for (int i = 0; i < colorItems.Count; i++)
		{
			SeeMorePasswordTxt.Inlines.Add(new Run(colorItems[i].Character.ToString()) { Foreground = new SolidColorBrush() { Color = colorItems[i].Color } }); // Add to text
		}
	}

	private void SeeMoreBtn_Click(object sender, RoutedEventArgs e)
	{
		if (StrengthContent.Visibility == Visibility.Visible) // If the content is visible
		{
			StrengthContent.Visibility = Visibility.Collapsed; // Change the visibility
			SeeMoreContent.Visibility = Visibility.Visible; // Change the visibility
			SeeMoreIconTxt.Text = "\uF15C"; // Change text
			SeeMoreTxt.Text = Properties.Resources.GoBack; // Change text

			InitSeeMoreUI(Global.IsConfidentialModeEnabled); // Init UI
		}
		else // If the content is hidden
		{
			StrengthContent.Visibility = Visibility.Visible; // Change the visibility
			SeeMoreContent.Visibility = Visibility.Collapsed; // Change the visibility
			SeeMoreIconTxt.Text = "\uF182"; // Change text
			SeeMoreTxt.Text = Properties.Resources.More; // Change text
		}
	}
}