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
using Passliss.UserControls;
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
using System.Windows.Shapes;

namespace Passliss.Windows
{
	/// <summary>
	/// Logique d'interaction pour LoadPasswordConfigurationWindow.xaml
	/// </summary>
	public partial class LoadPasswordConfigurationWindow : Window
	{
		public LoadPasswordConfigurationWindow()
		{
			InitializeComponent();
			InitUI(); // Load UI
			Global.LoadPasswordConfigurationWindow = this; // Define
		}

		/// <summary>
		/// Loads the UI.
		/// </summary>
		internal void InitUI()
		{
			ItemDisplayer.Children.Clear(); // Clear items

			for (int i = 0; i < Global.PasswordConfigurations.Count; i++)
			{
				ItemDisplayer.Children.Add(new PasswordConfigurationItem(Global.PasswordConfigurations[i])); // Add item
			}
		}

		private void CancelBtn_Click(object sender, RoutedEventArgs e)
		{
			Hide(); // Hide the window
		}

		private void Window_Deactivated(object sender, EventArgs e)
		{
			Hide(); // Hide the window when focus is lost
		}
	}
}
