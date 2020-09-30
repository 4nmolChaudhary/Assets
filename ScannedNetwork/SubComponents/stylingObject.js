import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  mb: {
    marginBottom: '2em',
  },
  root: {
    minWidth: 275,
    height: '100%',
    width: '100%',
  },
  label: {
    alignSelf: 'center',
    width: '25%',
    paddingRight: '1em',
  },
  saveButton: {
    margin: '1em 0 1em 0',
    float: 'right',
  },
  cancelButton: {
    margin: '1em 0 1em 0',
    float: 'left',
  },
  header: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.dark,
  },
  width_100: {
    width: '100%',
  },
  paddingRight: {
    padding: '0 1em 0 0',
  },
  text_center: {
    textAlign: 'center',
  },
}))

export const modalStyle = {
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%,-50%)`,
}
