import React from 'react'
import Modal from '@material-ui/core/Modal'
import ModalBody from './ModalBody'

function NetworkModal({ open, ipId, subnetId, id, ipRangeId, handleClose, formType, networkNameToUpdate, networkStartIPToUpdate, networkEndIPToUpdate, networkSubnetToUpdate, networkIpToUpdate }) {
  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby='simple-modal-title' aria-describedby='simple-modal-description'>
        <ModalBody open={open} id={id} ipId={ipId} subnetId={subnetId} ipRangeId={ipRangeId} closeModal={handleClose} networkNameToUpdate={networkNameToUpdate} networkStartIPToUpdate={networkStartIPToUpdate} networkEndIPToUpdate={networkEndIPToUpdate} networkSubnetToUpdate={networkSubnetToUpdate} networkIpToUpdate={networkIpToUpdate} formType={formType} />
      </Modal>
    </div>
  )
}

export default NetworkModal
