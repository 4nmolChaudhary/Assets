import create from 'zustand'

const useTableReRender = create(set => ({
  renderTable: 0,
  reRnderTable: () => set(state => ({ renderTable: state.renderTable + 1 })),
}))

export default useTableReRender
