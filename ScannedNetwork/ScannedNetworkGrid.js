import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import { REACT_APP_API_HOST } from '../../app/store/types'
import IconButton from '@material-ui/core/IconButton'
import Update from '@material-ui/icons/Update'
import Delete from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import NetworkModal from './SubComponents/NetworkModal'
import useTableReRender from './Helpers/reloadTable'

function ScannedNetworkGrid() {
  const [id, setId] = useState('')

  const [ipRangeId, setIpRangeId] = useState('')
  const [networkNameToUpdate, setNetworkNameToUpdate] = useState()
  const [networkStartIPToUpdate, setNetworkStartIPToUpdate] = useState()
  const [networkEndIPToUpdate, setNetworkEndIPToUpdate] = useState()
  const [networkSubnetToUpdate, setNetworkSubnetToUpdate] = useState()
  const [networkSubnetIdToUpdate, setNetworkSubnetIdToUpdate] = useState()
  const [networkIpToUpdate, setNetworkIpToUpdate] = useState()
  const [networkIpIdToUpdate, setNetworkIpIdToUpdate] = useState()

  const [getAddNetworkGrid, setAddNetworkGrid] = useState([])
  const [title, setTitle] = useState('0 SCANNED NETWORKS')

  const [open, setOpen] = useState(false)
  const { renderTable, reRnderTable } = useTableReRender()

  useEffect(() => {
    ;(async () => {
      const response = await axios.get(`${REACT_APP_API_HOST}/getscannednetworks`)
      const response_data = response.data
      const formated_data = response_data.map(i => {
        return {
          network_name: i.network_name,
          net_id: i.id,
          ipadd_id: i.ip_address !== undefined ? i.ip_address[0].id : 0,
          iprange_id: i.ip_range !== undefined ? i.ip_range[0].id : 0,
          sub_id: i.subnet_address !== undefined ? i.subnet_address[0].id : 0,
          ip_range: i.ip_range !== undefined ? i.ip_range[0].ip_range : '',
          start_ip: i.ip_range !== undefined ? i.ip_range[0].start_ip : '',
          end_ip: i.ip_range !== undefined ? i.ip_range[0].end_ip : '',
          subnet_address: i.subnet_address !== undefined ? i.subnet_address[0].subnet_address : '',
          ip_address: i.ip_address !== undefined ? i.ip_address[0].ip_address : '',
          collector_selection: 'Automatic',
        }
      })

      setTitle(`${response.data.length} SCANNED NETWORKS`)
      setAddNetworkGrid(formated_data)
      console.log(formated_data.length)
      console.log(`re render`, renderTable)
    })()
  }, [renderTable])

  const handleOpen = data => {
    const { net_id, sub_id, ipadd_id, iprange_id, network_name, start_ip, end_ip, subnet_address, ip_address } = data

    setId(net_id)
    setIpRangeId(iprange_id)
    setNetworkNameToUpdate(network_name)
    setNetworkStartIPToUpdate(start_ip)
    setNetworkEndIPToUpdate(end_ip)
    setNetworkSubnetIdToUpdate(sub_id)
    setNetworkSubnetToUpdate(subnet_address)
    setNetworkIpToUpdate(ip_address)
    setNetworkIpIdToUpdate(ipadd_id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteNetwork = data => {
    axios
      .delete(`${REACT_APP_API_HOST}/deleteAddnetwork/${data.net_id}`)
      .then(res => {
        console.log('RESPONSE RECEIVED: ', res)
        reRnderTable(renderTable + 1)
      })
      .catch(err => {
        console.log('AXIOS ERROR: ', err)
      })
  }

  const [state] = useState({
    columns: [
      { title: 'Network Name', field: 'network_name' },
      { title: 'IP Ranges', field: 'ip_range' },
      { title: 'SUBNET', field: 'subnet_address' },
      { title: 'IP ADDRESSES', field: 'ip_address' },
      { title: 'No. of Devices', field: 'no_of_devices' },
      { title: 'Scope', field: 'scope' },
      { title: 'Scan Status', field: 'scan_status' },
      { title: 'Assigned Netanalytics Collector', field: 'assigned_collector' },
      { title: 'Netanalytics Collector Selection', field: 'collector_selection' },
    ],
  })

  return (
    <div className='pb-16'>
      <MaterialTable
        title={title}
        columns={state.columns}
        data={getAddNetworkGrid}
        actions={[{ icon: '', tooltip: '', onClick: event => handleOpen(), selection: true }]}
        components={{
          Action: props => (
            <div>
              <label className='flex'>
                <Tooltip title='Update Network'>
                  <IconButton onClick={() => handleOpen(props.data)} color='primary' aria-label='upload picture' component='span'>
                    <Update />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Delete Network'>
                  <IconButton onClick={() => deleteNetwork(props.data)} color='primary' aria-label='upload picture' component='span'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </label>
            </div>
          ),
        }}
      />
      <NetworkModal open={open} formType='updateNetwork' id={id} ipId={networkIpIdToUpdate} subnetId={networkSubnetIdToUpdate} ipRangeId={ipRangeId} handleClose={handleClose} networkNameToUpdate={networkNameToUpdate} networkStartIPToUpdate={networkStartIPToUpdate} networkEndIPToUpdate={networkEndIPToUpdate} networkSubnetToUpdate={networkSubnetToUpdate} networkIpToUpdate={networkIpToUpdate} />
    </div>
  )
}

export default ScannedNetworkGrid
