import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
} from '@telegram-apps/sdk-react';

/**
 * Initializes the application and configures its dependencies.
 */
export function init(debug: boolean): void {
  // Set @telegram-apps/sdk-react debug mode.
  $debug.set(debug);

  // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
  // Also, configure the package.
  initSDK();

  // Add Eruda if needed.
  debug && import('eruda')
    .then((lib) => lib.default.init())
    .catch(console.error);

  // Check if all required components are supported.
  if (!backButton.isSupported() || !miniApp.isSupported()) {
    throw new Error('ERR_NOT_SUPPORTED');
  }

  // Mount all components used in the project.
  backButton.mount();
  miniApp.mount();
  themeParams.mount();
  initData.restore();
  void viewport
    .mount()
    .catch(e => {
      console.error('Something went wrong mounting the viewport', e);
    })
    .then(() => {
      viewport.bindCssVars();
    });

  // Define components-related CSS variables.
  miniApp.bindCssVars();
  themeParams.bindCssVars();

  // Set theme based on Telegram theme parameters
  setTheme();
}

/**
 * Sets up the theme by applying Telegram theme parameters to CSS variables.
 */
function setTheme(): void {
  // Get theme parameters or fallback to default values
  const theme = {
    bg_color: '#ffffff',
    text_color: '#000000',
    button_color: '#0088cc',
    hint_color: '#999999',
    link_color: '#0088cc',
  };

  // Apply CSS variables for the theme
  document.documentElement.style.setProperty('--bg-color', theme.bg_color);
  document.documentElement.style.setProperty('--text-color', theme.text_color);
  document.documentElement.style.setProperty('--button-color', theme.button_color);
  document.documentElement.style.setProperty('--hint-color', theme.hint_color);
  document.documentElement.style.setProperty('--link-color', theme.link_color);
}
