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
	/// Interaction logic for EncryptPage.xaml
	/// </summary>
	public partial class EncryptPage : Page
	{
		bool isPlaceholderShownEncrypt;
		public EncryptPage()
		{
			InitializeComponent();
			InitUI();
		}

		private void InitUI()
		{
			AlgorithmComboBox.SelectedIndex = 0;
			isPlaceholderShownEncrypt = true;
		}

		private void EncryptBtn_Click(object sender, RoutedEventArgs e)
		{
			if (string.IsNullOrEmpty(KeyTxt.Text))
			{
				return; // Stop
			}

			if (string.IsNullOrEmpty(StringToEncryptTxt.Text))
			{
				return; // Stop
			}

			// Encrypt
			EncryptedStringTxt.Text = AlgorithmComboBox.SelectedIndex switch
			{
				0 => Crypt.EncryptAES(StringToEncryptTxt.Text, KeyTxt.Text),
				_ => Crypt.EncryptAES(StringToEncryptTxt.Text, KeyTxt.Text)
			};
		}

		private void StringToEncryptTxt_GotFocus(object sender, RoutedEventArgs e)
		{
			if (isPlaceholderShownEncrypt)
			{
				StringToEncryptTxt.Text = ""; // Clear
				isPlaceholderShownEncrypt = false; // Set to false
				StringToEncryptTxt.Foreground = new SolidColorBrush() { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["Foreground1"].ToString()) }; // Set foreground
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
	}
}
