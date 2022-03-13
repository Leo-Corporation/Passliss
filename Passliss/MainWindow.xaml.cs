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
using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;

namespace Passliss;

/// <summary>
/// Interaction logic for MainWindow.xaml
/// </summary>
public partial class MainWindow : Window
{
	private Button CheckedButton { get; set; }

	readonly ColorAnimation colorAnimation = new()
	{
		From = (Color)ColorConverter.ConvertFromString(App.Current.Resources["AccentColor"].ToString()),
		To = (Color)ColorConverter.ConvertFromString(App.Current.Resources["Background1"].ToString()),
		Duration = new(TimeSpan.FromSeconds(0.2d))
	};

	public MainWindow()
	{
		InitializeComponent();
		InitUI(); // Init the UI elements
		Focus();
	}

	private void InitUI()
	{
		HelloTxt.Text = Global.GetHiSentence; // Set the "Hi" message
		PageContent.Content = Global.Settings.StartupPage switch
		{
			DefaultPage.Generate => Global.GeneratePage,
			DefaultPage.Strength => Global.StrenghtPage,
			DefaultPage.Encryption => Global.EncryptPage,
			_ => Global.GeneratePage
		}; // Set startup page

		CheckButton(Global.Settings.StartupPage switch
		{
			DefaultPage.Generate => GenerateTabBtn,
			DefaultPage.Strength => StrenghtTabBtn,
			DefaultPage.Encryption => EncryptTabBtn,
			_ => GenerateTabBtn
		}); // Check the selected page's button

		if (Global.Settings.IsFirstRun.Value)
		{
			ContentRendered += (o, e) =>
			{
				if (MessageBox.Show(Properties.Resources.EnableAutoUpdatesOnStartMsg, Properties.Resources.Updates, MessageBoxButton.YesNo, MessageBoxImage.Question) == MessageBoxResult.Yes)
				{
					Global.Settings.CheckUpdatesOnStart = true; // Set value
				}
				else
				{
					Global.Settings.CheckUpdatesOnStart = false; // Set value

				}

				Global.Settings.IsFirstRun = false; // First run message has been shown to the user
				SettingsManager.Save(); // Save changes

				Global.SettingsPage.InitUI();
			};
		}

		Global.GeneratePage.MainWindow = this;
	}

	private void ResetAllCheckStatus()
	{
		GenerateTabBtn.Foreground = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["Foreground1"].ToString()) }; // Set the foreground
		GenerateTabBtn.Background = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["Background1"].ToString()) }; // Set the background

		StrenghtTabBtn.Foreground = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["Foreground1"].ToString()) }; // Set the foreground
		StrenghtTabBtn.Background = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["Background1"].ToString()) }; // Set the background

		EncryptTabBtn.Foreground = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["Foreground1"].ToString()) }; // Set the foreground
		EncryptTabBtn.Background = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["Background1"].ToString()) }; // Set the background

		SettingsTabBtn.Foreground = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["Foreground1"].ToString()) }; // Set the foreground
		SettingsTabBtn.Background = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["Background1"].ToString()) }; // Set the background
	}

	private void CheckButton(Button button)
	{
		button.Foreground = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["WindowButtonsHoverForeground1"].ToString()) }; // Set the foreground
		button.Background = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["AccentColor"].ToString()) }; // Set the background

		CheckedButton = button; // Set the "checked" button
	}

	private void MinimizeBtn_Click(object sender, RoutedEventArgs e)
	{
		WindowState = WindowState.Minimized; // Minimize
	}

	private void CloseBtn_Click(object sender, RoutedEventArgs e)
	{
		Environment.Exit(0); // Close
	}

	private void TabEnter(object sender, MouseEventArgs e)
	{
		Button button = (Button)sender; // Create button

		button.Foreground = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["WindowButtonsHoverForeground1"].ToString()) }; // Set the foreground
	}

	private void TabLeave(object sender, MouseEventArgs e)
	{
		Button button = (Button)sender; // Create button

		if (button != CheckedButton)
		{
			button.Foreground = new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(App.Current.Resources["Foreground1"].ToString()) }; // Set the foreground 
			button.Background.BeginAnimation(SolidColorBrush.ColorProperty, colorAnimation); // Play animation
		}

	}

	private void GenerateTabBtn_Click(object sender, RoutedEventArgs e)
	{
		ResetAllCheckStatus(); // Reset the background and foreground of all buttons
		CheckButton(GenerateTabBtn); // Check the "Generate" button

		PageContent.Navigate(Global.GeneratePage); // Navigate
	}

	internal void StrenghtTabBtn_Click(object sender, RoutedEventArgs e)
	{
		ResetAllCheckStatus(); // Reset the background and foreground of all buttons
		CheckButton(StrenghtTabBtn); // Check the "Strenght" button

		PageContent.Navigate(Global.StrenghtPage); // Navigate
	}

	private void SettingsTabBtn_Click(object sender, RoutedEventArgs e)
	{
		ResetAllCheckStatus(); // Reset the background and foreground of all buttons
		CheckButton(SettingsTabBtn); // Check the "Settings" button

		PageContent.Navigate(Global.SettingsPage); // Navigate
	}

	private void EncryptTabBtn_Click(object sender, RoutedEventArgs e)
	{
		ResetAllCheckStatus(); // Reset the background and foreground of all buttons
		CheckButton(EncryptTabBtn); // Check the "Generate" button

		PageContent.Navigate(Global.EncryptPage); // Navigate
	}
}
