import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardState, Widget, Category } from '../types';
import { initialWidgets, initialCategories } from '../mockData/dashboardData';

const initialState: DashboardState = {
  categories: initialCategories,
  widgets: initialWidgets,
  searchQuery: '',
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<{ widget: Widget, categoryId: string }>) => {
      const { widget, categoryId } = action.payload;
      
      state.widgets = { ...state.widgets, [widget.id]: widget };
      
      state.categories = state.categories.map(cat => {
        if (cat.id === categoryId) {
          return { ...cat, widgets: [...cat.widgets, widget.id] }; 
        }
        return cat;
      });
    },
    
    removeWidget: (state, action: PayloadAction<{ widgetId: string, categoryId: string }>) => {
      const { widgetId, categoryId } = action.payload;
      let wasWidgetRemoved = false;

      state.categories = state.categories.map(cat => {
        if (cat.id === categoryId) {
          const updatedWidgets = cat.widgets.filter(id => id !== widgetId);
          if (updatedWidgets.length !== cat.widgets.length) {
              wasWidgetRemoved = true;
          }
          return { ...cat, widgets: updatedWidgets };
        }
        return cat;
      });
      
      if (wasWidgetRemoved) {
          const isWidgetUsedElsewhere = state.categories.some(
            cat => cat.widgets.includes(widgetId) 
          );
          
          if (!isWidgetUsedElsewhere && state.widgets[widgetId]) {
            const remainingWidgets = { ...state.widgets };
            delete remainingWidgets[widgetId];
            state.widgets = remainingWidgets;
          }
      }
    },
    
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories = [...state.categories, action.payload];
    },
    resetDashboard: () => initialState,
  },
});

export const { addWidget, removeWidget, setSearchQuery, addCategory, resetDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer; 