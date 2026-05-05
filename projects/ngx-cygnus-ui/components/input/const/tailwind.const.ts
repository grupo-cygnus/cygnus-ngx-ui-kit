export const TW_CLASS = {

  INPUT_BASE: 'px-3 py-3 block w-full text-sm transition duration-300 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg shadow-sm placeholder:text-gray-300 dark:placeholder:text-gray-500 text-gray-700 dark:text-white focus:ring-1 focus:outline-none focus:shadow text-neutral-900',

  INPUT_GENERIC: 'border-gray-300 focus:border-primary-700 focus:ring-primary-700',
  INPUT_SUCCESS: '!border-success-500 !focus:border-success-500 !focus:ring-success-500',
  INPUT_WARNING: '!border-warning-500 !focus:border-warning-500 !focus:ring-warning-500',
  INPUT_ERROR  : '!border-error-400 !focus:border-error-400 !focus:ring-error-400',

  INPUT_DISABLED: 'bg-neutral-50 text-neutral-400 cursor-not-allowed disabled:opacity-60 disabled:pointer-events-none focus:ring-0 focus:bg-gray-50 focus:border-gray-300 focus:opacity-60 focus:shadow-none',
  INPUT_FLOATING: '!pb-2 !pt-6 placeholder:text-transparent disabled:opacity-50 disabled:pointer-events-none focus:pb-2 !focus:pt-6 ![&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2',
  INPUT_FLOATING_ICON: '!pb-3 !pt-3 placeholder:text-transparent disabled:opacity-50 disabled:pointer-events-none !focus:pt-3 focus:pb-3 ![&:not(:placeholder-shown)]:pt-3 [&:not(:placeholder-shown)]:pb-3 !autofill:pt-3 autofill:pb-3',

  INPUT_TOP_BASE: 'px-4 !shadow-xs !placeholder:text-gray-300 !dark:placeholder:text-gray-500 !focus:outline-hidden focus:shadow-sm',
  INPUT_TOP_GENERIC: 'border-gray-300 focus:ring-primary-700 focus:border-primary-700',
  INPUT_TOP_SUCCESS: 'border-success-600 focus:ring-success-700 focus:border-success-700',
  INPUT_TOP_WARNING: 'border-warning-500 focus:ring-warning-500 focus:border-warning-500',
  INPUT_TOP_ERROR: 'border-error-400 focus:ring-error-400 focus:border-error-400',

  INPUT_INTERACTIVE_BASE: 'px-4 py-3 placeholder:opacity-0 placeholder:transition-opacity placeholder:duration-200 focus:placeholder:opacity-100',
  INPUT_INTERACTIVE_GENERIC: '',
  INPUT_INTERACTIVE_SUCCESS: 'placeholder:text-gray-300 dark:placeholder:text-gray-500  text-neutral-900 dark:text-white border-success-600 !focus:ring-success-700 !focus:border-success-700 focus:shadow',
  INPUT_INTERACTIVE_WARNING: 'placeholder:text-gray-300 dark:placeholder:text-gray-500  text-neutral-900 dark:text-white border-warning-600 !focus:ring-warning-700 !focus:border-warning-700  focus:shadow',
  INPUT_INTERACTIVE_ERROR: 'placeholder:text-gray-300 dark:placeholder:text-gray-500  text-neutral-900 dark:text-white border-error-400 !focus:ring-error-400 !focus:border-error-400 focus:shadow',

  INPUT_FILE: '!px-0 !py-0 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 file:cursor-pointer cursor-pointer',

  LABEL_BASE: 'block mb-1 text-sm font-medium text-gray-900 dark:text-white',

  LABEL_FLOATING_BASE: 'absolute top-0 start-0 !p-4 !pl-3 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-gray-50 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-gray-50 dark:text-white',

  LABEL_FLOATING_SUCCESS: '!peer-focus:text-gray-500 !peer-[:not(:placeholder-shown)]:text-gray-500 dark:text-white',
  LABEL_FLOATING_WARNING: '!peer-focus:text-gray-500 !peer-[:not(:placeholder-shown)]:text-gray-500 dark:text-white',
  LABEL_FLOATING_ERROR  : '!peer-focus:text-gray-500 !peer-[:not(:placeholder-shown)]:text-gray-500 dark:text-white',

  LABEL_TOP_BASE: 'absolute cursor-text bg-white px-1.5 left-2.5 -top-2.5 placeholder-shown:text-sm text-sm',
  LABEL_TOP_GENERIC: 'text-gray-600 dark:text-white peer-placeholder-shown:text-gray-700 dark:peer-placeholder-shown:text-gray-50',
  LABEL_TOP_SUCCESS: 'dark:text-white',
  LABEL_TOP_WARNING: 'dark:text-white',
  LABEL_TOP_ERROR: 'dark:text-white',

  LABEL_INTERACTIVE_BASE: 'absolute bg-white dark:bg-gray-700 cursor-text px-1 left-2.5 -top-2 text-xs scale-90 transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm rounded-xl',

  LABEL_INTERACTIVE_COLOR_BASE   : 'text-gray-600 dark:text-white peer-focus:text-gray-600 dark:peer-focus:text-gray-50 peer-placeholder-shown:text-gray-600 dark:peer-placeholder-shown:text-gray-50',
  LABEL_INTERACTIVE_COLOR_SUCCESS: 'dark:text-white',
  LABEL_INTERACTIVE_COLOR_WARNING: 'dark:text-white',
  LABEL_INTERACTIVE_COLOR_ERROR  : 'dark:text-white',

  FIELDSET_LEGEND: 'block mb-1 text-sm font-medium text-gray-900 dark:text-white',

  ELEMENT_RIGHT: 'absolute',
  ELEMENT_LEFT : 'absolute inset-y-0 flex items-center pointer-events-none start-0 ps-2 text-sm font-semibold text-gray-600 dark:text-white',

  HINT_TEXT   : 'mt-1 text-sm text-gray-500 dark:text-white',
  HINT_SUCCESS: '!text-success-600',
  HINT_WARNING: '!text-warning-600',
  HINT_ERROR  : '!text-error-400',

  INPUT_SIZE_SM: '!p-2.5',
  INPUT_SIZE_LG: '!p-4',

  // Wrapper para gradient border
  GRADIENT_WRAPPER: 'relative rounded-lg p-[2px] bg-gradient-to-r from-[#5850EC] to-[#F94C00]',
  GRADIENT_INNER: 'bg-warning-25 rounded-[0.5rem]',

  // Versión sin gradient (normal)
  NORMAL_WRAPPER: 'relative',

  DROPDOWN_MENU_FILTER: 'shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-s-lg hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-600 h-full',
  UL_BASE: 'absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white dark:bg-gray-700 p-1.5 shadow-lg focus:outline-none',
  LI_BASE: 'flex items-center w-full p-3 text-sm transition-all rounded-md cursor-pointer text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 focus:bg-slate-100 dark:bg-slate-700 active:bg-slate-100 dark:active:bg-slate-700',
}
