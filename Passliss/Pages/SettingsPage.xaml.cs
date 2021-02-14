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
using Passliss.Classes;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
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
    /// Logique d'interaction pour SettingsPage.xaml
    /// </summary>
    public partial class SettingsPage : Page
    {
        bool isAvailable;
        public SettingsPage()
        {
            InitializeComponent();
            InitUI(); // Init the UI
        }

        private async void InitUI()
        {
            // Load ThemeComboBox
            string[] themes = { Properties.Resources.Dark, Properties.Resources.Light }; // themes

            for (int i = 0; i < themes.Length; i++)
            {
                ThemeComboBox.Items.Add(themes[i]);
            }

            ThemeComboBox.SelectedIndex = Global.Settings.IsDarkTheme ? 0 : 1; // Set the selected index

            // Load LangComboBox
            LangComboBox.Items.Add(Properties.Resources.Default); // Add "default"

            for (int i = 0; i < Global.LanguageList.Count; i++)
            {
                LangComboBox.Items.Add(Global.LanguageList[i]);
            }

            LangComboBox.SelectedIndex = (Global.Settings.Language == "_default") ? 0 : Global.LanguageCodeList.IndexOf(Global.Settings.Language) + 1;

            LangApplyBtn.Visibility = Visibility.Hidden; // Hide
            ThemeApplyBtn.Visibility = Visibility.Hidden; // Hide

            // Update the UpdateStatusTxt
            isAvailable = Update.IsAvailable(Global.Version, await Update.GetLastVersionAsync(Global.LastVersionLink));

            UpdateStatusTxt.Text = isAvailable ? Properties.Resources.AvailableUpdates : Properties.Resources.UpToDate; // Set the text
            InstallIconTxt.Text = isAvailable ? "\uE9EA" : "\uE92A"; // Set text 
            InstallMsgTxt.Text = isAvailable ? Properties.Resources.Install : Properties.Resources.CheckUpdate; // Set text
        }

        private void ThemeApplyBtn_Click(object sender, RoutedEventArgs e)
        {
            Global.Settings.IsDarkTheme = ThemeComboBox.Text == Properties.Resources.Dark; // Set the settings
            SettingsManager.Save(); // Save the changes
            ThemeApplyBtn.Visibility = Visibility.Hidden; // Hide
            DisplayRestartMessage();
        }

        private void LangApplyBtn_Click(object sender, RoutedEventArgs e)
        {
            Global.Settings.Language = LangComboBox.Text switch
            {
                "English (United States)" => Global.LanguageCodeList[0], // Set the settings value
                "Français (France)"       => Global.LanguageCodeList[1], // Set the settings value
                _                         => "_default" // Set the settings value
            };
            SettingsManager.Save(); // Save the changes
            LangApplyBtn.Visibility = Visibility.Hidden; // Hide
            DisplayRestartMessage();
        }

        private void ThemeComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ThemeApplyBtn.Visibility = Visibility.Visible; // Visible
        }

        private void LangComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            LangApplyBtn.Visibility = Visibility.Visible; // Visible
        }

        /// <summary>
        /// Restarts Passliss.
        /// </summary>
        private void DisplayRestartMessage()
        {
            if (MessageBox.Show(Properties.Resources.NeedRestartToApplyChanges, Properties.Resources.Passliss, MessageBoxButton.YesNo, MessageBoxImage.Question) == MessageBoxResult.Yes)
            {
                Process.Start(Directory.GetCurrentDirectory() + @"\Passliss.exe"); // Start
                Environment.Exit(0); // Close
            }
        }

        private async void RefreshInstallBtn_Click(object sender, RoutedEventArgs e)
        {
            if (isAvailable) // If there is updates
            {
                string lastVersion = await Update.GetLastVersionAsync(Global.LastVersionLink); // Get last version
                if (MessageBox.Show(Properties.Resources.InstallConfirmMsg, $"{Properties.Resources.InstallVersion} {lastVersion}", MessageBoxButton.YesNo, MessageBoxImage.Information) == MessageBoxResult.Yes)
                {
                    Process.Start(Directory.GetCurrentDirectory() + @"\Xalyus Updater.exe"); // Start
                    Environment.Exit(0); // Close
                }
            }
            else
            {
                // Update the UpdateStatusTxt
                isAvailable = Update.IsAvailable(Global.Version, await Update.GetLastVersionAsync(Global.LastVersionLink));

                UpdateStatusTxt.Text = isAvailable ? Properties.Resources.AvailableUpdates : Properties.Resources.UpToDate; // Set the text
                InstallIconTxt.Text = isAvailable ? "\uE9EA" : "\uE92A"; // Set text 
                InstallMsgTxt.Text = isAvailable ? Properties.Resources.Install : Properties.Resources.CheckUpdate; // Set text
            }
        }
    }
}
