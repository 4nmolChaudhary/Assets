import React, { useRef, useState } from 'react'
import { useStyles, modalStyle } from './stylingObject'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Formsy from 'formsy-react'
import { TextFieldFormsy } from '@fuse/core/formsy'
import axios from 'axios'
import { REACT_APP_API_HOST } from '../../../app/store/types'
import useTableReRender from '../Helpers/reloadTable'

function ModalBody({ closeModal, formType, ipId, ipRangeId, subnetId, id, networkNameToUpdate, networkStartIPToUpdate, networkEndIPToUpdate, networkSubnetToUpdate, networkIpToUpdate }, ref) {
  const classes = useStyles()
  const [networkName, setNetworkNameToUpdate] = useState(networkNameToUpdate ?? '')
  const [networkStartIP, setNetworkStartIP] = useState(networkStartIPToUpdate ?? '')
  const [networkEndIP, setNetworkEndIP] = useState(networkEndIPToUpdate ?? '')
  const [networkSubnet, setNetworkSubnetToUpdate] = useState(networkSubnetToUpdate ?? '')
  const [networkIp, setNetworkIpToUpdate] = useState(networkIpToUpdate ?? '')

  const [iprangeList, setiprangeList] = useState([{ start_ip: '', end_ip: '', id: '0', network_id: '0' }])
  const [subnetList, setsubnetList] = useState([{ subnet_address: '', id: '0', network_id: '0' }])
  const [ipaddressList, setipaddressList] = useState([{ ip_address: '', id: '0', network_id: '0' }])
  const [option, setOption] = useState('automatic')
  const [isFormValid, setIsFormValid] = useState(false)
  const [isIPRangeValueReuired, setsIPRangeValueReuired] = useState(true)
  const [isIPRangeValid, setsIPRangeValid] = useState(false)
  const [isSubnetValueReuired, setsSubnetValueReuired] = useState(true)
  const [isIPAddressValueReuired, setsIPAddressValueReuired] = useState(true)
  const { renderTable, reRnderTable } = useTableReRender()

  const formRef = useRef(null)

  const options = [
    {
      value: 'automatic',
      label: 'Automatic',
    },
    {
      value: 'manual',
      label: 'Manual',
    },
  ]

  const handleIPRange = (e, index) => {
    const { name, value } = e.target

    e.target.id === 'start_ip' && setNetworkStartIP(value)
    e.target.id === 'end_ip' && setNetworkEndIP(value)

    const list = [...iprangeList]
    list[index][name] = value
    setiprangeList(list)
    value === '' ? setsIPRangeValueReuired(true) : setsIPRangeValueReuired(false)
    ipRangeValidation(iprangeList)
  }

  const ipRangeValidation = iprangeList => {
    for (let index = 0; index < iprangeList.length; index++) {
      let start_ip_list = iprangeList[index].start_ip.split('.')
      let end_ip_list = iprangeList[index].end_ip.split('.')

      if (start_ip_list.length === 4 && end_ip_list.length === 4) {
        let count = 0
        for (let i = 0; i <= start_ip_list.length; i++) {
          if (start_ip_list[i] <= end_ip_list[i]) {
            count = count + 1
          }
        }

        if (count === 4) {
          setsIPRangeValid(true)
        } else {
          setsIPRangeValid(false)
          return
        }
      }
    }
  }

  const handleSubnet = (e, index) => {
    const { name, value } = e.target
    const list = [...subnetList]
    list[index][name] = value
    setsubnetList(list)
    setNetworkSubnetToUpdate(value)
    value || index > 0 ? setsSubnetValueReuired(false) : setsSubnetValueReuired(true)
  }

  const handleIPAddress = (e, index) => {
    const { name, value } = e.target
    const list = [...ipaddressList]
    list[index][name] = value
    setipaddressList(list)
    setNetworkIpToUpdate(value)
    value || index > 0 ? setsIPAddressValueReuired(false) : setsIPAddressValueReuired(true)
  }

  // handle click event of the Remove Ip Range button
  const remove_ip_range_field = index => {
    const list = [...iprangeList]
    list.splice(index, 1)
    setiprangeList(list)
    ipRangeValidation(iprangeList)
  }

  const remove_subnet_field = index => {
    const list = [...subnetList]
    list.splice(index, 1)
    setsubnetList(list)
    //console.log("After Removing Subnet List", subnetList);
  }

  const remove_ip_address_field = index => {
    const list = [...ipaddressList]
    list.splice(index, 1)
    setipaddressList(list)
  }

  const handleClose = () => {
    let index = 1 //to remove added extra multiple input filed after closing Network Model
    closeModal(false)
    remove_ip_range_field(index)
    remove_subnet_field(index)
    remove_ip_address_field(index)

    setiprangeList([{ start_ip: '', end_ip: '', id: '0', network_id: '0' }])
    setsubnetList([{ subnet_address: '', id: '0', network_id: '0' }])
    setipaddressList([{ ip_address: '', id: '0', network_id: '0' }])

    setsIPRangeValueReuired(true)
    setsSubnetValueReuired(true)
    setsIPAddressValueReuired(true)
  }

  const handleChange = event => {
    setOption(event.target.value)
  }

  function disableButton() {
    setIsFormValid(false)
  }

  function enableButton() {
    setIsFormValid(true)
  }

  function handleSubmit() {
    ipRangeValidation(iprangeList)

    for (let i = 0; i < iprangeList.length; i++) {
      //console.log("Total submitted List is", iprangeList.length);
      if (iprangeList[i].start_ip !== '' && iprangeList[i].end_ip !== '') {
        //console.log("in has both startip and end ip", !isIPRangeValid);
        if (!isIPRangeValid) {
          alert('Please input Valid IP Range..!')
          return
        }
      }
      if (iprangeList[i].start_ip !== '') {
        if (iprangeList[i].end_ip === '') {
          alert('Please input End IP Range..!')
          return
        }
      }
      if (iprangeList[i].end_ip !== '') {
        if (iprangeList[i].start_ip === '') {
          alert('Please input Start IP Range..!')
          return
        }
      }
    }

    var ip_range = iprangeList[0].start_ip || iprangeList[0].end_ip ? iprangeList : [],
      subnet_address = subnetList[0].subnet_address ? subnetList : [],
      ip_address = ipaddressList[0].ip_address ? ipaddressList : []

    if (formType === 'addNewNetwork') {
      const added_network_details = {
        network_id: 0,
        network_status: 'Up',
        network_name: networkName,
        ip_range: ip_range,
        subnet_address: subnet_address,
        ip_address: ip_address,
      }
      console.log('Sumbitted Details', added_network_details)
      axios
        .post(`${REACT_APP_API_HOST}/postAddnetwork`, added_network_details)
        .then(res => {
          console.log('RESPONSE RECEIVED: ', res)
          reRnderTable(renderTable + 1)
        })
        .catch(err => {
          console.log('AXIOS ERROR: ', err)
        })
      handleClose()
    }

    if (formType === 'updateNetwork') {
      const updated_network_details = {
        id: id,
        network_status: 'Up',
        network_name: networkName,
        ip_range:
          networkEndIP === '' && networkStartIP === ''
            ? []
            : [
                {
                  end_ip: networkEndIP,
                  id: ipRangeId,
                  ip_range: `${networkStartIP}-${networkEndIP}`,
                  network_id: id,
                  start_ip: networkStartIP,
                },
              ],
        subnet_address:
          networkSubnet === ''
            ? []
            : [
                {
                  id: subnetId ?? 0,
                  network_id: id,
                  subnet_address: networkSubnet,
                },
              ],
        ip_address:
          networkIp === ''
            ? []
            : [
                {
                  id: ipId ?? 0,
                  ip_address: networkIp,
                  network_id: id,
                },
              ],
      }
      //console.log(networkStartIP, networkEndIP)
      console.log('Sumbitted Updated Details', updated_network_details)

      axios
        .put(`${REACT_APP_API_HOST}/updateAddnetwork/${updated_network_details.id}`, updated_network_details)
        .then(res => {
          console.log('RESPONSE RECEIVED: ', res)
          reRnderTable(renderTable + 1)
          //setsIPRangeValid(false)
        })
        .catch(err => {
          console.log('AXIOS ERROR: ', err)
          setsIPRangeValid(false)
        })
      handleClose()
    }
  }

  return (
    <div style={modalStyle} className={classes.paper}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.header} gutterBottom variant='h5' component='h2'>
            {formType === 'addNewNetwork' && 'ADD NETWORK'}
            {formType === 'updateNetwork' && 'UPDATE NETWORK'}
          </Typography>
          <div>
            <Formsy className={classes.root} onValidSubmit={handleSubmit} onValid={enableButton} onInvalid={disableButton} ref={formRef}>
              <div className='flex mb-20'>
                <div className={clsx(classes.label)}>
                  <label>Network Name</label>
                </div>
                <TextFieldFormsy
                  className={classes.width_100}
                  type='text'
                  placeholder='Enter Network Name'
                  name='network_name'
                  value={networkName}
                  onChange={e => setNetworkNameToUpdate(e.target.value)}
                  validations={{
                    minLength: 1,
                  }}
                  validationErrors={{
                    minLength: 'Provide valid Network Name..!',
                  }}
                  id='network_name'
                  variant='outlined'
                  required
                />
              </div>
              <div className='flex mb-20'>
                <div className={clsx(classes.label)}>
                  <label>IP RANGES</label>
                </div>
                <div className={classes.width_100}>
                  {iprangeList.map((x, i) => {
                    return (
                      <div className='flex' style={{ marginBottom: '1em' }} key={i}>
                        <TextFieldFormsy
                          className={clsx(classes.width_100, classes.paddingRight)}
                          type='text'
                          name='start_ip'
                          placeholder='Enter Start IP'
                          value={networkStartIP}
                          variant='outlined'
                          id='start_ip'
                          onChange={e => handleIPRange(e, i)}
                          validations={{
                            matchRegexp: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-4]|2[0-4][0-9]|[01]?[1-9][0-9]?)$/,
                          }}
                          validationErrors={{
                            matchRegexp: 'Provide Valid  Start IP Adresses..!',
                          }}
                          required={!isIPRangeValueReuired || !isSubnetValueReuired || !isIPAddressValueReuired ? false : true}
                        />
                        <TextFieldFormsy
                          className={classes.width_100}
                          name='end_ip'
                          placeholder='Enter End IP'
                          value={networkEndIP}
                          variant='outlined'
                          id='end_ip'
                          onChange={e => handleIPRange(e, i)}
                          validations={{
                            matchRegexp: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-4]|2[0-4][0-9]|[01]?[1-9][0-9]?)$/,
                          }}
                          validationErrors={{
                            matchRegexp: 'Provide Valid End IP Adresses..!',
                          }}
                          // required={true}
                          required={!isIPRangeValueReuired || !isSubnetValueReuired || !isIPAddressValueReuired ? false : true}
                        />
                      </div>
                    )
                  })}
                  <div className={classes.text_center}>OR</div>
                </div>
              </div>
              <div className='flex mb-20'>
                <div className={clsx(classes.label)}>
                  <label>SUBNET</label>
                </div>
                <div className={classes.width_100}>
                  {subnetList.map((x, i) => {
                    return (
                      <div className='flex' style={{ marginBottom: '1em' }} key={i}>
                        <TextFieldFormsy
                          style={{ width: '85%' }}
                          key={i}
                          className={classes.width_100}
                          type='text'
                          name='subnet_address'
                          placeholder='Enter Subnet Address'
                          value={networkSubnet}
                          onChange={e => handleSubnet(e, i)}
                          variant='outlined'
                          id='subnet_address'
                          validations={{
                            matchRegexp: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(?:(?:3[0-2])|(?:[1-2]\d)|[1-9])$/,
                            // matchRegexp: /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/,
                          }}
                          validationErrors={{
                            matchRegexp: 'Provide Valid Subnet Adresses..!',
                          }}
                          required={!isIPRangeValueReuired || !isSubnetValueReuired || !isIPAddressValueReuired ? false : true}
                        />
                      </div>
                    )
                  })}
                  <div className={classes.text_center}>OR</div>
                </div>
              </div>
              <div className='flex mb-20'>
                <div className={clsx(classes.label)}>
                  <label>IP ADDRESSES</label>
                </div>
                <div className={classes.width_100}>
                  {ipaddressList.map((x, i) => {
                    return (
                      <div className='flex' style={{ marginBottom: '1em' }} key={i}>
                        <TextFieldFormsy
                          style={{ width: '85%' }}
                          key={i}
                          className={classes.width_100}
                          type='text'
                          name='ip_address'
                          placeholder='Enter IP Addresses'
                          value={networkIp}
                          variant='outlined'
                          id='ip_address'
                          onChange={e => handleIPAddress(e, i)}
                          validations={{
                            matchRegexp: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-4]|2[0-4][0-9]|[01]?[1-9][0-9]?)$/,
                          }}
                          validationErrors={{
                            matchRegexp: 'Provide Valid IP Adresses..!',
                          }}
                          required={!isIPRangeValueReuired || !isSubnetValueReuired || !isIPAddressValueReuired ? false : true}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='flex mb-20'>
                <div className={clsx(classes.label)}>
                  <label>Netanalytics Collector Selection</label>
                </div>
                <TextField
                  id='outlined-select-currency-native'
                  select
                  value={option}
                  SelectProps={{
                    native: true,
                  }}
                  style={{ width: '100%' }}
                  onChange={handleChange}
                  variant='outlined'>
                  {options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>
              <Divider />
              <div>
                <Button onClick={handleClose} className={classes.cancelButton} variant='contained' color='primary'>
                  CANCEL
                </Button>
              </div>
              <Button className={classes.saveButton} type='submit' variant='contained' color='primary' aria-label='LOG IN' disabled={!isFormValid}>
                SAVE
              </Button>
            </Formsy>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default React.forwardRef(ModalBody)
