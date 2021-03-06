﻿/*
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
using Passliss.Classes;
using Passliss.Enums;
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

namespace Passliss.Pages
{
	/// <summary>
	/// Logique d'interaction pour StrenghtPage.xaml
	/// </summary>
	public partial class StrenghtPage : Page
	{
		public StrenghtPage()
		{
			InitializeComponent();
		}

		private string GetStrenghtCaracter(PasswordStrenght passwordStrenght)
		{
			return passwordStrenght switch
			{
				PasswordStrenght.VeryGood => "", // If the password strenght is very good
				PasswordStrenght.Good => "", // If the password strenght is good
				PasswordStrenght.Medium => "", // If the password strenght is medium
				PasswordStrenght.Low => "", // If the password strenght is low
				_ => "" // If the password strenght is unknown
			};
		}

		private string GetStrenghtText(PasswordStrenght passwordStrenght)
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

		private void PasswordTxt_TextChanged(object sender, TextChangedEventArgs e)
		{
			PasswordStrenght password = Global.GetPasswordStrenght(PasswordTxt.Text); // Get strenght

			IconTxt.Text = GetStrenghtCaracter(password); // Get text
			CommentTxt.Text = GetStrenghtText(password); // Get text

			IconTxt.Foreground = Global.GetStrenghtColorBrush(password); // Get the color
		}

		private void HideShowPassword_Click(object sender, RoutedEventArgs e)
		{
			if (PasswordPwrBox.Visibility == Visibility.Hidden) // If the password is visible
			{
				PasswordPwrBox.Visibility = Visibility.Visible; // Change the visibility
				PasswordTxt.Visibility = Visibility.Hidden; // Change the visibility
				PasswordPwrBox.Password = PasswordTxt.Text; // Set text
				HideShowPassword.Content = "\ue9fb"; // Change text
				HideShowPassword.FontSize = 9; // Change font size
			}
			else // If the password is hidden
			{
				PasswordPwrBox.Visibility = Visibility.Hidden; // Change the visibility
				PasswordTxt.Visibility = Visibility.Visible; // Change the visibility
				PasswordTxt.Text = PasswordPwrBox.Password; // Set text
				HideShowPassword.Content = "\ue9fa"; // Change text
				HideShowPassword.FontSize = 15; // Change font size
			}
		}

		private void PasswordPwrBox_PasswordChanged(object sender, RoutedEventArgs e)
		{
			PasswordStrenght password = Global.GetPasswordStrenght(PasswordPwrBox.Password); // Get strenght

			IconTxt.Text = GetStrenghtCaracter(password); // Get text
			CommentTxt.Text = GetStrenghtText(password); // Get text

			IconTxt.Foreground = Global.GetStrenghtColorBrush(password); // Get the color
		}
	}
}
