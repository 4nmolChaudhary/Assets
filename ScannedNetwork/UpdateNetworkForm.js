// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
// import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import clsx from 'clsx';
// import TextField from '@material-ui/core/TextField';
// import Divider from '@material-ui/core/Divider';
// import Formsy from 'formsy-react';
// import { useRef, useState } from 'react';
// import { TextFieldFormsy } from '@fuse/core/formsy';
// import axios from 'axios';
// import { REACT_APP_API_HOST } from '../../app/store/types'
// import { connect } from 'react-redux'

// const mapStateToProps = state => {
//     return {
//         device_id: state.livedeviceiddata.livedeviceiddata.livedeviceidinfo
//     }
// }
// const options = [
//     {
//         value: 'automatic',
//         label: 'Automatic',
//     },
//     {
//         value: 'manual',
//         label: 'Manual',
//     },

// ];

// function getModalStyle() {
//     const top = 50;
//     const left = 50;
//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

// const useStyles = makeStyles((theme) => ({
//     paper: {
//         position: 'absolute',
//         width: 800,
//         backgroundColor: theme.palette.background.paper,
//         boxShadow: theme.shadows[5],
//     },
//     mb: {
//         marginBottom: "2em",
//     }, root: {
//         minWidth: 275,
//         height: '100%',
//         width: '100%',
//     },
//     label: {
//         alignSelf: 'center',
//         width: '25%',
//         paddingRight: '1em'
//     },
//     saveButton: {
//         margin: '1em 0 1em 0',
//         float: 'right'

//     },
//     cancelButton: {
//         margin: '1em 0 1em 0',
//         float: 'left'
//     },
//     header: {
//         color: 'white',
//         textAlign: 'center',
//         backgroundColor: theme.palette.primary.dark,
//     },
//     width_100: {
//         width: '100%'
//     }
// }));

// function UpdateNetworkForm(props) {
//     const classes = useStyles();
//     const [modalStyle] = React.useState(getModalStyle);
//     const [open, setOpen] = React.useState(false);
//     const [option, setOption] = React.useState('automatic');
//     const [isFormValid, setIsFormValid] = useState(false);
//     const formRef = useRef(null);

//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleChange = (event) => {
//         setOption(event.target.value);
//     };

//     function disableButton() {
//         setIsFormValid(false);
//     }

//     function enableButton() {
//         setIsFormValid(true);
//     }

//     function handleSubmit(form_data) {
//         var ip_range = form_data.ip_range.split(" "),
//             subnet_address = form_data.subnet_address.split(" "),
//             ip_address = form_data.ip_address.split(" ");

//         const added_network_details = {
//             "network_name": form_data.network_name,
//             "ip_range": ip_range,
//             "subnet_address": subnet_address,
//             "ip_address": ip_address,
//         }
//         console.log('Sumbitted Details', added_network_details);
//         axios.put(`${REACT_APP_API_HOST}/updateAddnetwork/12`, added_network_details)
//             .then((res) => { console.log("RESPONSE RECEIVED: ", res); })
//             .catch((err) => { console.log("AXIOS ERROR: ", err); })
//         handleClose();
//     }
//     const body = (
//         <div style={modalStyle} className={classes.paper}>
//             <Card className={classes.root}>
//                 <CardContent>
//                     <Typography className={classes.header} gutterBottom variant="h5" component="h2">
//                         UPDATE NETWORK
//                      </Typography>
//                     <div>
//                         <Formsy className={classes.root}
//                             onValidSubmit={handleSubmit}
//                             onValid={enableButton}
//                             onInvalid={disableButton}
//                             ref={formRef}>
//                             <div className="flex mb-20">
//                                 <div className={clsx(classes.label)}>
//                                     <label>Network Name</label>
//                                 </div>
//                                 <TextFieldFormsy
//                                     className={classes.width_100}
//                                     type="text"
//                                     name="network_name"
//                                     // onChange={event => setTitle(event.target.value)}
//                                     // validations={{
//                                     //     isNumeric: true,
//                                     // }}
//                                     // validationErrors={{
//                                     //     isNumeric: 'Provide valid Name..!',
//                                     // }}
//                                     id="network_name"
//                                     variant="outlined"
//                                     required
//                                 />
//                             </div>
//                             <div className="flex mb-20">
//                                 <div className={clsx(classes.label)}>
//                                     <label>IP RANGES</label>
//                                 </div>
//                                 <TextFieldFormsy
//                                     className={classes.width_100}
//                                     type="textarea"
//                                     name="ip_range"
//                                     // onChange={event => setTitle(event.target.value)}
//                                     // validations={{
//                                     //     isNumeric: true,
//                                     // }}
//                                     // validationErrors={{
//                                     //     isNumeric: 'Provide valid IP Range..!',
//                                     // }}
//                                     id="ip_range"
//                                     variant="outlined"
//                                     required
//                                 />
//                             </div>
//                             <div className="flex mb-20">
//                                 <div className={clsx(classes.label)}>
//                                     <label>SUBNET</label>
//                                 </div>
//                                 <TextFieldFormsy
//                                     className={classes.width_100}
//                                     type="text"
//                                     name="subnet_address"
//                                     // validations={{
//                                     //     minLength: 8,
//                                     // }}
//                                     // validationErrors={{
//                                     //     minLength: 'Provide Valid Subnet..!',
//                                     // }}
//                                     id="subnet_address"
//                                     variant="outlined"
//                                     required
//                                 />
//                             </div>
//                             <div className="flex mb-20">
//                                 <div className={clsx(classes.label)}>
//                                     <label>IP ADDRESSES</label>
//                                 </div>
//                                 <TextFieldFormsy
//                                     className={classes.width_100}
//                                     type="text"
//                                     name="ip_address"
//                                     // validations={{
//                                     //     minLength: 8,
//                                     // }}
//                                     // validationErrors={{
//                                     //     minLength: 'Provide Valid IP Adresses..!',
//                                     // }}
//                                     id="ip_address"
//                                     variant="outlined"
//                                     required
//                                 />
//                             </div>
//                             <div className="flex mb-20">
//                                 <div className={clsx(classes.label)}>
//                                     <label>Netanalytics Collector Selection</label>
//                                 </div>
//                                 <TextField
//                                     id="outlined-select-currency-native"
//                                     select
//                                     value={option}
//                                     SelectProps={{
//                                         native: true,
//                                     }}
//                                     style={{ width: '100%' }}
//                                     onChange={handleChange}
//                                     variant="outlined"
//                                 >
//                                     {options.map((option) => (
//                                         <option key={option.value} value={option.value}>
//                                             {option.label}
//                                         </option>
//                                     ))}
//                                 </TextField>
//                             </div>
//                             <div>
//                                 <Button
//                                     open={props.open}
//                                     onClick={handleClose}
//                                     className={classes.cancelButton}
//                                     variant="contained"
//                                     color="primary"
//                                 >
//                                     CANCEL
//                                 </Button>
//                             </div>
//                             <Button className={classes.saveButton}
//                                 type="submit"
//                                 variant="contained"
//                                 color="primary"
//                                 aria-label="LOG IN"
//                                 disabled={!isFormValid}
//                             >
//                                 UPDATE
//                             </Button>
//                         </Formsy>
//                         <Divider />
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );

//     return (
//         <div className={classes.mb}>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 startIcon={<AddIcon />}
//                 onClick={handleOpen}

//             >
//             </Button>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="simple-modal-title"
//                 aria-describedby="simple-modal-description"
//             >
//                 {body}
//             </Modal>
//         </div>
//     );
// }

// export default connect(mapStateToProps)(UpdateNetworkForm);