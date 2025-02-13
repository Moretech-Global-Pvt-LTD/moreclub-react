import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  sections: [],
  loading: false,
  error: null,
  tableRestaurant_id: null,
};

// Create a slice for section management
const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    setSections: (state, action) => {

      state.sections = action.payload.Section;
      state.tableRestaurant_id = action.payload.res_id;
      state.error = null;
    },

    // Add a new section
    addSection: (state, action) => {
      state.sections.push(action.payload);
    },

    // Update an existing section
    updateSection: (state, action) => {
      const index = state.sections.findIndex(
        (section) => section.id === action.payload.id
      );
      if (index !== -1) {
        state.sections[index] = action.payload;
      }
    },

    // Delete a section by ID
    deleteSection: (state, action) => {
      state.sections = state.sections.filter(
        (section) => section.id !== action.payload
      );
    },

    // Add a table to a section
    addTable: (state, action) => {
      const section = state.sections.find(
        (sec) => sec.id === action.payload.sectionId
      );
      if (section) {
        section.tables.push(action.payload.table);
      }
    },

    // Update a table in a section
    updateTable: (state, action) => {
      const section = state.sections.find(
        (sec) => sec.id === action.payload.sectionId
      );
      if (section) {
        const tableIndex = section.tables.findIndex(
          (table) => table.id === action.payload.table.id
        );
        if (tableIndex !== -1) {
          section.tables[tableIndex] = {
            ...section.tables[tableIndex],
            ...action.payload.table,
          };
        }
      }
    },

    updateTableWS: (state, action) => {
      let sectionFound = null;
      let tableIndex = -1;
      console.log("payload",action.payload);
    
      // Iterate through all sections to find the table by ID
      for (const section of state.sections) {
        tableIndex = section.tables.findIndex(
          (table) => table.id === action.payload.table.id
        );
    
        if (tableIndex !== -1) {
          sectionFound = section;
          break;  // Stop searching once the table is found
        }
      }
    
      // Update the table if found
      if (sectionFound) {
        sectionFound.tables[tableIndex] = {
          ...sectionFound.tables[tableIndex],
          ...action.payload.table,
        };
      }
    },

    // Delete a table from a section
    deleteTable: (state, action) => {
      console.log(action.payload);
      const section = state.sections.find(
        (sec) => sec.id === action.payload.sectionId
      );
      if (section) {
        section.tables = section.tables.filter(
          (table) => table.id !== action.payload.tableId
        );
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTableError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export actions for use in components
export const {
  setSections,
  addSection,
  updateSection,
  deleteSection,
  addTable,
  updateTable,
  deleteTable,
  setLoading,
  setTableError,
  updateTableWS
} = sectionSlice.actions;

// Export the reducer for use in the store
export default sectionSlice.reducer;
