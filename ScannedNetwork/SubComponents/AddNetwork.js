import React, { useState } from 'react'
import { useStyles } from './stylingObject'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import NetworkModal from './NetworkModal'

function AddNetwork() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.mb}>
      <Button variant='contained' color='primary' size='large' startIcon={<AddIcon />} onClick={handleOpen}>
        Add Network
      </Button>
      <NetworkModal open={open} formType='addNewNetwork' handleClose={handleClose} />
    </div>
  )
}

export default AddNetwork
