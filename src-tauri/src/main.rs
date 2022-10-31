#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let preferences = CustomMenuItem::new("preferences".to_string(), "Preferences");
    let openfolder = CustomMenuItem::new("openfolder".to_string(), "Open Folder...");
    let openrecent = CustomMenuItem::new("openfile".to_string(), "Open Recent...");
    let about = CustomMenuItem::new("about".to_string(), "About");
    let filemenu = Submenu::new(
        "File",
        Menu::new()
            .add_item(openfolder)
            .add_item(openrecent)
            .add_native_item(MenuItem::Separator)
            .add_item(preferences)
            .add_item(quit),
    );
    let helpmenu = Submenu::new("Help", Menu::new().add_item(about));
    let menu = Menu::new().add_submenu(filemenu).add_submenu(helpmenu);

    tauri::Builder::default()
        .menu(menu)
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
