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
using Passliss.Classes;
using PeyrSharp.Core;
using PeyrSharp.Enums;
using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;

namespace Passliss.Pages;

/// <summary>
/// Interaction logic for EncryptPage.xaml
/// </summary>
public partial class EncryptPage : Page
{
	bool isPlaceholderShownEncrypt;
	bool isPlaceholderShownDecrypt;
	private Button CheckedButton { get; set; }
	public EncryptPage()
	{
		InitializeComponent();
		InitUI();
	}

	private void InitUI()
	{
		AlgorithmComboBox.SelectedIndex = (int)Global.Settings.DefaultEncryptionAlgorithm.Value;
		isPlaceholderShownEncrypt = true;
		isPlaceholderShownDecrypt = true;

		ResetAllCheckStatus();

		CheckButton(EncryptTabBtn); // Check
	}

	private void EncryptBtn_Click(object sender, RoutedEventArgs e)
	{
		try
		{
			if (string.IsNullOrEmpty(KeyTxt.Text))
			{
				MessageBox.Show(Properties.Resources.PleaseProvideKeyMsg, Properties.Resources.Encryption, MessageBoxButton.OK, MessageBoxImage.Information);
				return; // Stop
			}

			if (string.IsNullOrEmpty(StringToEncryptTxt.Text) || isPlaceholderShownEncrypt)
			{
				MessageBox.Show(Properties.Resources.PleaseProvideText, Properties.Resources.Encryption, MessageBoxButton.OK, MessageBoxImage.Information);
				return; // Stop
			}

			// Encrypt
			EncryptedStringTxt.Text = AlgorithmComboBox.SelectedIndex switch
			{
				0 => Crypt.EncryptAes(StringToEncryptTxt.Text, KeyTxt.Text), // AES
				1 => Crypt.Encrypt3Des(StringToEncryptTxt.Text, KeyTxt.Text), // 3DES
				_ => Crypt.EncryptAes(StringToEncryptTxt.Text, KeyTxt.Text) // AES (by default)
			};
		}
		catch (Exception ex)
		{
			MessageBox.Show($"{Properties.Resources.ErrorOccured}.\n{ex.Message}", Properties.Resources.Error, MessageBoxButton.OK, MessageBoxImage.Error); // Show error
		}
	}

	private void StringToEncryptTxt_GotFocus(object sender, RoutedEventArgs e)
	{
		if (isPlaceholderShownEncrypt)
		{
			StringToEncryptTxt.Text = ""; // Clear
			isPlaceholderShownEncrypt = false; // Set to false
			StringToEncryptTxt.Foreground = new SolidColorBrush() { Color = Global.GetColorFromResource("Foreground1") }; // Set foreground
		}
	}

	private void StringToEncryptTxt_LostFocus(object sender, RoutedEventArgs e)
	{
		if (StringToEncryptTxt.Text == string.Empty)
		{
			StringToEncryptTxt.Text = Properties.Resources.StringToEncrypt; // Set text
			isPlaceholderShownEncrypt = true; // Set to true
			StringToEncryptTxt.Foreground = new SolidColorBrush() { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["DarkGray"].ToString()) }; // Set foreground
		}
	}

	private void CopyEncryptBtn_Click(object sender, RoutedEventArgs e)
	{
		Clipboard.SetText(EncryptedStringTxt.Text); // Copy to clipboard
	}

	private void TabEnter(object sender, MouseEventArgs e)
	{
		Button button = (Button)sender; // Create button

		button.Foreground = new SolidColorBrush { Color = Global.GetColorFromResource("WindowButtonsHoverForeground1") }; // Set the foreground
	}

	private void TabLeave(object sender, MouseEventArgs e)
	{
		Button button = (Button)sender; // Create button

		if (button != CheckedButton)
		{
			button.Foreground = new SolidColorBrush { Color = Global.GetColorFromResource("Foreground1") }; // Set the foreground 
		}
	}

	private void ResetAllCheckStatus()
	{
		EncryptTabBtn.Foreground = new SolidColorBrush { Color = Global.GetColorFromResource("Foreground1") }; // Set the foreground
		EncryptTabBtn.Background = new SolidColorBrush { Color = Global.GetColorFromResource("Background1") }; // Set the background

		DecryptTabBtn.Foreground = new SolidColorBrush { Color = Global.GetColorFromResource("Foreground1") }; // Set the foreground
		DecryptTabBtn.Background = new SolidColorBrush { Color = Global.GetColorFromResource("Background1") }; // Set the background
	}

	private void CheckButton(Button button)
	{
		button.Foreground = new SolidColorBrush { Color = Global.GetColorFromResource("WindowButtonsHoverForeground1") }; // Set the foreground
		button.Background = new SolidColorBrush { Color = Global.GetColorFromResource("AccentColor") }; // Set the background

		CheckedButton = button; // Set the "checked" button
	}

	private void EncryptTabBtn_Click(object sender, RoutedEventArgs e)
	{
		ResetAllCheckStatus(); // Reset the background and foreground of all buttons
		CheckButton(EncryptTabBtn); // Check the "Encrypt" button

		DecryptTabPage.Visibility = Visibility.Collapsed; // Hide
		EncryptTabPage.Visibility = Visibility.Visible; // Hide
	}

	private void DecryptTabBtn_Click(object sender, RoutedEventArgs e)
	{
		ResetAllCheckStatus(); // Reset the background and foreground of all buttons
		CheckButton(DecryptTabBtn); // Check the "Decrypt" button

		DecryptTabPage.Visibility = Visibility.Visible; // Hide
		EncryptTabPage.Visibility = Visibility.Collapsed; // Hide
	}

	private void DecryptBtn_Click(object sender, RoutedEventArgs e)
	{
		try
		{
			if (string.IsNullOrEmpty(DecryptKeyTxt.Text))
			{
				MessageBox.Show(Properties.Resources.PleaseProvideKeyMsg, Properties.Resources.Encryption, MessageBoxButton.OK, MessageBoxImage.Information);
				return; // Stop
			}

			if (string.IsNullOrEmpty(StringToDecryptTxt.Text) || isPlaceholderShownDecrypt)
			{
				MessageBox.Show(Properties.Resources.PleaseProvideText, Properties.Resources.Encryption, MessageBoxButton.OK, MessageBoxImage.Information);
				return; // Stop
			}

			// Decrypt
			DecryptedStringTxt.Text = AlgorithmComboBox.SelectedIndex switch
			{
				0 => Crypt.DecryptAes(StringToDecryptTxt.Text, DecryptKeyTxt.Text), // AES
				1 => Crypt.Decrypt3Des(StringToDecryptTxt.Text, DecryptKeyTxt.Text), // 3DES
				_ => Crypt.DecryptAes(StringToDecryptTxt.Text, DecryptKeyTxt.Text) // AES (by default)
			};
		}
		catch (Exception ex)
		{
			MessageBox.Show($"{Properties.Resources.ErrorOccured}.\n{ex.Message}", Properties.Resources.Error, MessageBoxButton.OK, MessageBoxImage.Error); // Show error
		}
	}

	private void CopyDecryptBtn_Click(object sender, RoutedEventArgs e)
	{
		Clipboard.SetText(DecryptedStringTxt.Text); // Copy decrypted string
	}

	private void StringToDecryptTxt_GotFocus(object sender, RoutedEventArgs e)
	{
		if (isPlaceholderShownDecrypt)
		{
			StringToDecryptTxt.Text = ""; // Clear
			isPlaceholderShownDecrypt = false; // Set to false
			StringToDecryptTxt.Foreground = new SolidColorBrush() { Color = Global.GetColorFromResource("Foreground1") }; // Set foreground
		}
	}

	private void StringToDecryptTxt_LostFocus(object sender, RoutedEventArgs e)
	{
		if (StringToDecryptTxt.Text == string.Empty)
		{
			StringToDecryptTxt.Text = Properties.Resources.StringToDecrypt; // Set text
			isPlaceholderShownDecrypt = true; // Set to true
			StringToDecryptTxt.Foreground = new SolidColorBrush() { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["DarkGray"].ToString()) }; // Set foreground
		}
	}

	private async void GenerateKeyBtn_Click(object sender, RoutedEventArgs e)
	{
		KeyTxt.Text = await Password.GenerateAsync(24, PasswordPresets.Simple);
	}
}
