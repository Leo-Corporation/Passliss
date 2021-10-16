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
using System.Windows;
using System.Windows.Controls;

namespace Passliss.UserControls
{
	/// <summary>
	/// Interaction logic for PasswordHistoryItem.xaml
	/// </summary>
	public partial class PasswordHistoryItem : UserControl
	{
		string Password { get; init; }
		StackPanel StackPanel { get; init; }
		public PasswordHistoryItem(string password, StackPanel stackPanel)
		{
			InitializeComponent();
			Password = password; // Set
			StackPanel = stackPanel; // Set

			InitUI();
		}

		private void InitUI()
		{
			PasswordTxt.Text = Password; // Set text
		}

		private void CopyBtn_Click(object sender, RoutedEventArgs e)
		{
			Clipboard.SetText(Password); // Copy
		}

		private void DeleteBtn_Click(object sender, RoutedEventArgs e)
		{
			StackPanel.Children.Remove(this); // Remove
			Global.GeneratePage.HistoryBtn_Click(this, null);
		}
	}
}
