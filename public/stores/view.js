
export default function(state, hub) {

  state.set({ $set: {} })
  
  hub.on({

    selectPane: function(pane) {
      state.set({ pane: { $set: pane } })
    },

    selectProjectByName: function(name) {
      state.set({ pane: { $set: 'project' } })
    }
  })
}
