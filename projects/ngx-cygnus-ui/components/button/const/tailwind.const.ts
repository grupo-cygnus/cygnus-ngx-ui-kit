export const TW_CLASS = {
  // BASE: Se mantiene focus:outline-none para limpiar el clic,
  // pero el anillo (ring) pasa a focus-visible.
  BTN: 'cursor-pointer flex justify-center items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in rounded-lg shadow-sm hover:shadow-md focus-visible:ring-2 focus:outline-none focus:shadow-none data-[shape=pill]:rounded-full data-[width=full]:w-full px-5 py-2.5 text-base disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed',

  BTN_PRIMARY: 'bg-blue-600 border-blue-600 text-blue-50 hover:bg-blue-800 hover:border-blue-800 focus-visible:ring-blue-300',

  BTN_SECONDARY: 'text-gray-700 dark:text-gray-400 bg-gray-25 dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-300 hover:border-gray-300 focus-visible:ring-gray-300',

  BTN_ACCENT: 'text-blue-700 border-blue-50 bg-blue-50 hover:bg-blue-100 hover:text-blue-600 focus-visible:ring-gray-300',

  BTN_GRAY: 'bg-gray-200 border-gray-200 text-gray-800 hover:bg-gray-300 hover:border-gray-300 focus-visible:ring-gray-300',

  BTN_FULL_GRAY: 'bg-gray-600 border-gray-600 text-gray-50 hover:bg-gray-700 hover:border-gray-700',

  BTN_GREEN: 'text-white bg-green-600 border-transparent hover:bg-green-700 focus-visible:bg-green-600 focus-visible:ring-green-300 hover:border-transparent',

  BTN_AMBER: 'border-transparent text-white bg-amber-600 hover:bg-amber-700 hover:border-transparent focus-visible:bg-warning-700 focus-visible:ring-amber-300',

  BTN_RED: 'border-transparent text-white bg-red-600 hover:bg-red-700 focus-visible:bg-red-700 focus-visible:ring-red-300 hover:border-transparent',

  BTN_INDIGO: 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus-visible:bg-indigo-700 focus-visible:ring-indigo-300 hover:border-transparent',

  BTN_BLUE_VIOLET: 'border-transparent text-white bg-blue-violet-600 hover:bg-blue-violet-700 focus-visible:bg-blue-violet-700 focus-visible:ring-blue-violet-300 hover:border-transparent',

  BTN_CYGNUS: 'border-transparent text-white bg-cygnus-600 hover:bg-cygnus-700 focus-visible:bg-cygnus-700 focus-visible:ring-cygnus-300 hover:border-transparent',

  BTN_PRIMARY_CYGNUS: 'border-transparent text-white bg-primary-cygnus-400 hover:bg-primary-cygnus-500 focus-visible:bg-primary-cygnus-500 focus-visible:ring-primary-cygnus-300 hover:border-transparent',

  BTN_ACCESIBILIDAD_CYGNUS: 'border-transparent text-cygnus-600 bg-white hover:text-cygnus-700 focus-visible:bg-gray-100 focus-visible:ring-gray-100 hover:border-transparent',

  BTN_POSTULAAQUI_ORANGE: 'border-postulaaqui-orange-300 text-postulaaqui-orange-300 bg-postulaaqui-50 focus-visible:bg-postulaaqui-200 hover:border-postulaaqui-orange-300 hover:bg-cygnus-500 hover:text-cygnus-50 hover:shadow-md focus-visible:ring-cygnus-500',

  BTN_SIDEBAR: 'justify-start bg-gray-50 border-transparent text-blue-800 hover:bg-blue-800/10 hover:border-blue-800/10 shadow-none hover:shadow-none',

  BTN_CIRCLE: '!p-2.5 !rounded-full min-w-[40px] inline-flex justify-center items-center gap-x-2 disabled:pointer-events-none',

  BTN_GHOST: 'text-blue-800 bg-transparent border-transparent !shadow-none hover:bg-blue-700/5 hover:border-blue-700/5 !hover:shadow-none focus-visible:ring-blue-300 focus-visible:border-gray-800 transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',

  BTN_GHOST_GRAY: 'text-gray-600 bg-transparent border-transparent !shadow-none hover:bg-gray-200 hover:border-gray-800/5 !hover:shadow-none focus-visible:ring-blue-300 focus-visible:border-gray-800 transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',

  BTN_OUTLINED: 'border-blue-700 text-blue-700 hover:bg-blue-800 hover:text-blue-50 hover:shadow-md focus-visible:ring-blue-300',

  BTN_OUTLINED_RED: 'border-red-700 text-red-700 hover:bg-red-700 hover:text-red-50 hover:shadow-md focus-visible:ring-red-300',

  BTN_OUTLINED_GREEN: 'border-green-700 text-green-700 hover:bg-green-700 hover:text-green-50 hover:shadow-md focus-visible:ring-green-300',

  BTN_OUTLINED_AMBER: 'border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-amber-50 hover:shadow-md focus-visible:ring-amber-300',

  BTN_OUTLINED_GRAY: 'border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-gray-50 hover:shadow-md focus-visible:ring-gray-300',

  BTN_OUTLINED_CYGNUS: 'border-cygnus-500 text-cygnus-500 hover:bg-cygnus-500 hover:text-cygnus-50 hover:shadow-md focus-visible:ring-cygnus-500',

  BTN_DISABLED: 'text-white bg-blue-400 cursor-not-allowed',

  BTN_BLOCK: 'hover:shadow-md !w-full',

  BTN_SIZE_XS: '!px-2.5 !py-1.5 !text-sm',
  BTN_SIZE_SM: '!px-3 !py-2 !text-sm',
  BTN_SIZE_LG: '!px-5 !py-3 !text-base',
  BTN_SIZE_XL: '!px-5 !py-3.5 !text-base',

  BTN_ICON_ONLY_SIZE_XS: '!px-0 !py-0 !inline-grid !min-h-[32px] !min-w-[32px] select-none !place-items-center align-middle leading-none',
  BTN_ICON_ONLY_SIZE_SM: '!px-0 !py-0 !inline-grid min-h-[40px] !min-w-[40px] select-none !place-items-center align-middle leading-none',
  BTN_ICON_ONLY: '!px-0 !py-0 !inline-grid !min-h-[44px] !min-w-[44px] select-none !place-items-center align-middle leading-none',
  BTN_ICON_ONLY_SIZE_LG: '!px-0 !py-0 !inline-grid !min-h-[48px] !min-w-[48px] select-none !place-items-center align-middle leading-none',
  BTN_ICON_ONLY_SIZE_XL: '!px-0 !py-0 !inline-grid !min-h-[52px] !min-w-[52px] select-none !place-items-center align-middle leading-none',
  BTN_ICON_ONLY_SIZE_FULL: '!px-0 !py-0 !inline-grid !min-h-[52px] !min-w-[52px] select-none !place-items-center align-middle leading-none',

  BTN_ICON_LOADING: 'animate-spin inline-block border-2 border-t-transparent rounded-full',

  BTN_GROUP_LEFT: 'border-r-0 inline-flex leading-none rounded-r-none',
  BTN_GROUP_MIDDLE: 'inline-flex leading-none rounded-none',
  BTN_GROUP_RIGHT: 'border-l-0 inline-flex leading-none rounded-l-none',

  BTN_LINK: 'flex justify-center items-center transition-colors duration-300 text-sm font-medium no-underline bg-transparent hover:bg-transparent focus-visible:ring-0 text-blue-600 hover:text-blue-800 active:underline hover:underline py-2.5',

  BTN_LINK_SIMPLE: 'block text-sm transition-colors duration-300 hover:text-blue-800 hover:underline text-blue-600 py-1.5',

  BTN_LINK_NAVBAR: 'text-sm font-medium text-gray-500 inline-flex items-center w-full px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-white',

  BTN_LINK_NAVBAR_ACTIVE: '!text-blue-700 !bg-blue-100 !hover:text-blue-600',

  BTN_A: 'group relative overflow-hidden focus-visible:ring-4 inline-flex items-center rounded-lg justify-center',

  BTN_GRADIENT: 'bg-gradient-to-r from-[#5850EC] to-[#F94C00] text-[#F6FEF9] hover:opacity-90 transition-opacity',
}
