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
using Passliss.Windows;
using System.Windows;

namespace Passliss;

/// <summary>
/// Interaction logic for App.xaml
/// </summary>
public partial class App : Application
{
	protected override void OnStartup(StartupEventArgs e)
	{
		SettingsManager.Load(); // Load settings

		Global.ChangeTheme(); // Update the theme
		Global.ChangeLanguage(); // Change the language

		PasswordConfigurationManager.Load(); // Load configurations

		Global.SettingsPage = new(); // Create a new settings page
		Global.GeneratePage = new(); // Create a new generate page
		Global.StrenghtPage = new(); // Create a new strenght page
		Global.EncryptPage = new(); // Create a new encryption page

		if (Global.Settings.IsFirstRun.Value)
		{
			new FirstRunWindow().Show(); // Show first run experience
		}
		else
		{
			int? pageID = (e.Args.Length >= 2 && e.Args[0] == "/page") ? int.Parse(e.Args[1]) : null; // Get the page ID

			new MainWindow(pageID == null ? null : (Enums.DefaultPage)pageID).Show(); // Open Passliss
			Global.CreateJumpLists(); // Create taskbar jump lists
		}
	}
}
