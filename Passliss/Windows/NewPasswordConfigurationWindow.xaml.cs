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
using System.Text.RegularExpressions;
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
    /// Logique d'interaction pour NewPasswordConfigurationWindow.xaml
    /// </summary>
    public partial class NewPasswordConfigurationWindow : Window
    {
        public NewPasswordConfigurationWindow()
        {
            InitializeComponent();
            InitUI();
        }

        /// <summary>
        /// True if all unchecked.
        /// </summary>
        /// <returns>A <see cref="bool"/> value.</returns>
        private bool IsNoCheckboxesChecked()
        {
            return (!LowerCaseChk.IsChecked.Value && !UpperCaseChk.IsChecked.Value && !NumbersChk.IsChecked.Value && !SpecialCaractersChk.IsChecked.Value);
        }

        /// <summary>
        /// Load the UI.
        /// </summary>
        private void InitUI()
        {
            NameTxt.Text = Properties.Resources.PasswordConfigurations + $"{Global.PasswordConfigurations.Count + 1}"; // Set the name
            LowerCaseChk.IsChecked = true; // Check the checkbox
            UpperCaseChk.IsChecked = true; // Check the checkbox
            NumbersChk.IsChecked = true; // Check the checkbox

            LenghtTxt.Text = "20";
        }

        private void SaveBtn_Click(object sender, RoutedEventArgs e)
        {
            LenghtTxt.Text = LenghtTxt.Text.Replace(" ", ""); // Remove whitespaces to avoid errors
            if (LenghtTxt.Text.Length <= 0 || !(int.Parse(LenghtTxt.Text) > 0))
            {
                MessageBox.Show(Properties.Resources.PleaseSpecifyLenghtMsg, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information); // Show message
                return;
            }

            if (!IsNoCheckboxesChecked())
            {
                Global.PasswordConfigurations.Add(new PasswordConfiguration
                {
                    UseLowerCase = LowerCaseChk.IsChecked.Value, // Set value
                    UseNumbers = NumbersChk.IsChecked.Value, // Set value
                    UseSpecialCaracters = SpecialCaractersChk.IsChecked.Value, // Set value
                    UseUpperCase = UpperCaseChk.IsChecked.Value, // Set value
                    Length = LenghtTxt.Text, // Set value
                    Name = NameTxt.Text // Set value
                });

                PasswordConfigurationManager.Save(); // Save the changes

                InitUI(); // Reload the UI
                Hide(); // Hide the window
            }
            else
            {
                MessageBox.Show(Properties.Resources.PleaseSelectChkMsg, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }

        private void CancelBtn_Click(object sender, RoutedEventArgs e)
        {
            Hide(); // Hide the window
        }

        private void LenghtTxt_PreviewTextInput(object sender, TextCompositionEventArgs e)
        {
            Regex regex = new("[^0-9]+");
            e.Handled = regex.IsMatch(e.Text);
        }
    }
}
