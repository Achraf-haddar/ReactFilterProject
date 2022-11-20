import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogActions from '@mui/material/DialogActions';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  onChangeGame: (value: any) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [checked, setChecked] = React.useState([false, false, false, false]);
  const [checked1, setChecked1] = React.useState([false, false, false, false, false, false, false]);
  const [checked2, setChecked2] = React.useState([false, false]);
  const [checked3, setChecked3] = React.useState([false, false, false, false]);
  const [checked4, setChecked4] = React.useState([false, false, false]);

  const submit = () => {
    handleClose()
    props.onChangeGame([checked, checked1, checked2, checked3, checked4])
  }

  // Hold'em Handle changes
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked, event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1], checked[2], checked[3]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked, checked[2], checked[3]]);
  };

  const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], checked[1], event.target.checked, checked[3]]);
  };

  const handleChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], checked[1], checked[2], event.target.checked]);
  };

  // Omaha Handle changes
  const handleChange11 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked1([event.target.checked, event.target.checked, event.target.checked, event.target.checked,
                 event.target.checked, event.target.checked, event.target.checked]);
  };

  const handleChange12 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked1([event.target.checked, checked1[1], checked1[2], checked1[3], checked1[4], checked1[5], checked1[6]]);
  };

  const handleChange13 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked1([checked1[0], event.target.checked, checked1[2], checked1[3], checked1[4], checked1[5], checked1[6]]);
  };

  const handleChange14 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked1([checked1[0], checked1[1], event.target.checked, checked1[3], checked1[4], checked1[5], checked1[6]]);
  };

  const handleChange15 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked1([checked1[0], checked1[1], checked1[2], event.target.checked, checked1[4], checked1[5], checked1[6]]);
  };
  const handleChange16 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked1([checked1[0], checked1[1], checked1[2], checked1[3], event.target.checked, checked1[5], checked1[6]]);
  };
  const handleChange17 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked1([checked1[0], checked1[1], checked1[2], checked1[3], checked1[4], event.target.checked, checked1[6]]);
  };
  const handleChange18 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked1([checked1[0], checked1[1], checked1[2], checked1[3], checked1[4], checked1[5], event.target.checked]);
  };

  // Stud Handle changes
  const handleChange21 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2([event.target.checked, event.target.checked]);
  };
  const handleChange22 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2([event.target.checked, checked2[1]]);
  };
  const handleChange23 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2([checked2[0], event.target.checked]);
  };

  // Draw Games Handle changes
  const handleChange31 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked3([event.target.checked, event.target.checked, event.target.checked, event.target.checked]);
  };

  const handleChange32 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked3([event.target.checked, checked3[1], checked3[2], checked3[3]]);
  };

  const handleChange33 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked3([checked3[0], event.target.checked, checked3[2], checked3[3]]);
  };

  const handleChange34 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked3([checked3[0], checked3[1], event.target.checked, checked3[3]]);
  };

  const handleChange35 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked3([checked3[0], checked3[1], checked3[2], event.target.checked]);
  };

  // Mixed Games
  const handleChange41 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked4([event.target.checked, event.target.checked, event.target.checked]);
  };

  const handleChange42 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked4([event.target.checked, checked4[1], checked4[2]]);
  };

  const handleChange43 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked4([checked4[0], event.target.checked, checked4[2]]);
  };

  const handleChange44 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked4([checked4[0], checked4[1], event.target.checked]);
  };

  const firstChildren = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="No Limit Hold'em"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Limit Hold'em"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="6+ Hold'em"
        control={<Checkbox checked={checked[2]} onChange={handleChange4} />}
      />
      <FormControlLabel
        label="Showtime Hold'em"
        control={<Checkbox checked={checked[3]} onChange={handleChange5} />}
      />
    </Box>
  );

  const secondChildren = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Pot Limit Omaha"
        control={<Checkbox checked={checked1[0]} onChange={handleChange12} />}
      />
      <FormControlLabel
        label="No Limit Omaha"
        control={<Checkbox checked={checked1[1]} onChange={handleChange13} />}
      />
      <FormControlLabel
        label="Omaha Hi/Lo"
        control={<Checkbox checked={checked1[2]} onChange={handleChange14} />}
      />
      <FormControlLabel
        label="6 Card Omaha"
        control={<Checkbox checked={checked1[3]} onChange={handleChange15} />}
      />
      <FormControlLabel
        label="5 Card Omaha"
        control={<Checkbox checked={checked1[4]} onChange={handleChange16} />}
      />
      <FormControlLabel
        label="Courcheval"
        control={<Checkbox checked={checked1[5]} onChange={handleChange17} />}
      />
      <FormControlLabel
        label="Fusion"
        control={<Checkbox checked={checked1[6]} onChange={handleChange18} />}
      />
    </Box>
  );

  const thirdChildren = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Stud"
        control={<Checkbox checked={checked2[0]} onChange={handleChange22} />}
      />
      <FormControlLabel
        label="Razz"
        control={<Checkbox checked={checked2[1]} onChange={handleChange23} />}
      />
    </Box>
  );


  const fourthChildren = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="5 Card Draw"
        control={<Checkbox checked={checked3[0]} onChange={handleChange32} />}
      />
      <FormControlLabel
        label="2-7 Triple Draw"
        control={<Checkbox checked={checked3[1]} onChange={handleChange33} />}
      />
      <FormControlLabel
        label="2-7 Single Draw"
        control={<Checkbox checked={checked3[2]} onChange={handleChange34} />}
      />
      <FormControlLabel
        label="Badugi"
        control={<Checkbox checked={checked3[3]} onChange={handleChange35} />}
      />
    </Box>
  );

  const fifthChildren = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="8-Game"
        control={<Checkbox checked={checked4[0]} onChange={handleChange42} />}
      />
      <FormControlLabel
        label="Horse"
        control={<Checkbox checked={checked4[1]} onChange={handleChange43} />}
      />
      <FormControlLabel
        label="Hold'em/Omaha"
        control={<Checkbox checked={checked4[2]} onChange={handleChange44} />}
      />
      
    </Box>
  );

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} fullWidth>
          Game Filter
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Game Filter</DialogTitle>
        {/* Hold'em */}
        <List sx={{ pt: 0 }}>
            <ListItem button>
              <FormControlLabel
                label="Hold'em"
                control={
                  <Checkbox
                    checked={checked[0] && checked[1] && checked[2] && checked[3]}
                    indeterminate={(checked[0] || checked[1] || checked[2] || checked[3]) && !(checked[0] && checked[1] && checked[2] && checked[3])}
                    onChange={handleChange1}
                  />
                }
              />
              {firstChildren}
            </ListItem>
        </List>

        {/* Omaha */}
        <List sx={{ pt: 0 }}>
            <ListItem button>
              <FormControlLabel
                label="Omaha"
                control={
                  <Checkbox
                    checked={checked1[0] && checked1[1] && checked1[2] && checked1[3] && checked1[4] && checked1[5] && checked1[6]}
                    indeterminate={(checked1[0] || checked1[1] || checked1[2] || checked1[3] || checked1[4] || checked1[5] || checked1[6]) && !(checked1[0] && checked1[1] && checked1[2] && checked1[3] && checked1[4] && checked1[5] && checked1[6])}
                    onChange={handleChange11}
                  />
                }
              />
              {secondChildren}
            </ListItem>
        </List>
        {/* Stud */}
        <List sx={{ pt: 0 }}>
            <ListItem button key={"Test"}>
              <FormControlLabel
                label="Stud"
                control={
                  <Checkbox
                    checked={checked2[0] && checked2[1]}
                    indeterminate={(checked2[0] || checked2[1]) && !(checked2[0] && checked2[1])}
                    onChange={handleChange21}
                  />
                }
              />
              {thirdChildren}
            </ListItem>
        </List>     
        {/* Draw Games */}
        <List sx={{ pt: 0 }}>
            <ListItem button>
              <FormControlLabel
                label="Draw Games"
                control={
                  <Checkbox
                    checked={checked3[0] && checked3[1] && checked3[2] && checked3[3]}
                    indeterminate={(checked3[0] || checked3[1] || checked3[2] || checked3[3]) && !(checked3[0] && checked3[1] && checked3[2] && checked3[3])}
                    onChange={handleChange31}
                  />
                }
              />
              {fourthChildren}
            </ListItem>
        </List>
        {/* Mixed Games */}
        <List sx={{ pt: 0 }}>
            <ListItem button key={"Test"}>
              <FormControlLabel
                label="Mixed Games"
                control={
                  <Checkbox
                    checked={checked4[0] && checked4[1] && checked4[2]}
                    indeterminate={(checked4[0] || checked4[1] || checked4[2]) && !(checked4[0] && checked4[1] && checked4[2])}
                    onChange={handleChange41}
                  />
                }
              />
              {fifthChildren}
            </ListItem>
        </List>

        <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={submit} autoFocus>
              Agree
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function GameFilterComponent({ onChangeGame }: any) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <br />
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        onChangeGame={onChangeGame}
      />
    </div>
  );
}