import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./partials/index-cygnus-ui/index-cygnus-ui.component').then( (c) => c.IndexCygnusUiComponent )
  },
  {
    path: 'fonts',
    loadComponent: () => import('./pages/fonts-content/fonts-content.component').then( (c) => c.FontsContentComponent )
  },
  {
    path: 'accordion',
    loadComponent: () => import('./pages/accordion-content/accordion-content.component').then( (c) => c.AccordionContentComponent )
  },
  {
    path: 'alerts',
    loadComponent: () => import('./pages/alert-content/alert-content.component').then( (c) => c.AlertContentComponent )
  },
  {
    path: 'badges',
    loadComponent: () => import('./pages/badge-content/badge-content.component').then( (c) => c.BadgeContentComponent )
  },
  {
    path: 'buttons',
    loadComponent: () => import('./pages/button-content/button-content.component').then( (c) => c.ButtonContentComponent )
  },
  {
    path: 'breadcrumbs',
    loadComponent: () => import('./pages/breadcrumb-content/breadcrumb-content.component').then( (c) => c.BreadcrumbContentComponent )
  },
  {
    path: 'cards',
    loadComponent: () => import('./pages/card-content/card-content.component').then( (c) => c.CardContentComponent )
  },
  {
    path: 'carousel',
    loadComponent: () => import('./pages/carousel-content/carousel-content.component').then( (c) => c.CarouselContentComponent )
  },
  {
    path: 'collapsible',
    loadComponent: () => import('./pages/collapsible-content/collapsible-content.component').then( (c) => c.CollapsibleContentComponent )
  },
  {
    path: 'checkboxes',
    loadComponent: () => import('./pages/checkbox-content/checkbox-content.component').then( (c) => c.CheckboxContentComponent )
  },
  {
    path: 'dropdown',
    loadComponent: () => import('./pages/dropdown-content/dropdown-content.component').then( (c) => c.DropdownContentComponent )
  },
  {
    path: 'lists',
    loadComponent: () => import('./pages/list-content/list-content.component').then( (c) => c.ListContentComponent )
  },
  {
    path: 'inputs',
    loadComponent: () => import('./pages/input-content/input-content.component').then( (c) => c.InputContentComponent )
  },
  {
    path: 'modals',
    loadComponent: () => import('./pages/modal-content/modal-content.component').then( (c) => c.ModalContentComponent )
  },
  {
    path: 'navbar',
    loadComponent: () => import('./pages/navbar-content/navbar-content.component').then( (c) => c.NavbarContentComponent ),
    children: [
      {
        path: 'card',
        loadComponent: () => import('./pages/card-content/card-content.component').then( (c) => c.CardContentComponent )
      },
      {
        path: 'login-01',
        loadComponent: () => import('./pages/login-content/login-content.component').then( (c) => c.LoginContentComponent )
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: 'progressbar',
    loadComponent: () => import('./pages/progressbar-content/progressbar-content.component').then( (c) => c.ProgressbarContentComponent )
  },
  {
    path: 'pagination',
    loadComponent: () => import('./pages/pagination-content/pagination-content.component').then( (c) => c.PaginationContentComponent )
  },
  {
    path: 'popovers',
    loadComponent: () => import('./pages/popover-content/popover-content.component').then( (c) => c.PopoverContentComponent )
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs-content/tabs-content.component').then( (c) => c.TabsContentComponent )
  },
  {
    path: 'radiobuttons',
    loadComponent: () => import('./pages/radio-button-content/radio-button-content.component').then( (c) => c.RadioButtonContentComponent )
  },
  {
    path: 'sidebar',
    loadComponent: () => import('./pages/sidebar-content/sidebar-content.component').then( (c) => c.SidebarContentComponent )
  },
  {
    path: 'selectores',
    loadComponent: () => import('./pages/select-content/select-content.component').then( (c) => c.SelectContentComponent )
  },
  {
    path: 'selectores-search',
    loadComponent: () => import('./pages/select-search-content/select-search-content.component').then( (c) => c.SelectSearchContentComponent )
  },
  {
    path: 'tables',
    loadComponent: () => import('./pages/table-content/table-content.component').then( (c) => c.TableContentComponent )
  },
  {
    path: 'table-javi',
    loadComponent: () => import('./pages/table-javi-content/table-javi-content.component').then( (c) => c.TableJaviContentComponent )
  },
  {
    path: 'textarea',
    loadComponent: () => import('./pages/textarea-content/textarea-content.component').then( (c) => c.TextareaContentComponent )
  },
  {
    path: 'toggles',
    loadComponent: () => import('./pages/toggle-content/toggle-content.component').then( (c) => c.ToggleContentComponent )
  },
  {
    path: 'tooltips',
    loadComponent: () => import('./pages/tooltip-content/tooltip-content.component').then( (c) => c.TooltipContentComponent )
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-content/login-content.component').then( (c) => c.LoginContentComponent )
  },
  {
    path: 'video-recorder',
    loadComponent: () => import('./pages/video-recorder-content/video-recorder-content.component').then( (c) => c.VideoRecorderContentComponent )
  },
  {
    path: '**',
    redirectTo: ''
  }
];
