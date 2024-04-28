// import React from 'react';
// import {
//     List,
//     ListItem,
//     ListItemAvatar,
//     Avatar,
//     ListItemText,
//     Typography,
//     Paper,
//     Button,
//     AppBar,
//     Toolbar,
//     makeStyles
// } from '@mui/material';
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         backgroundColor: theme.palette.background.paper,
//     },
//     inline: {
//         display: 'inline',
//     },
//     appBar: {
//         top: 'auto',
//         bottom: 0,
//         alignItems: 'center',
//     },
//     title: {
//         color: theme.palette.primary.main,
//         textAlign: 'center',
//     },
//     avatar: {
//         width: theme.spacing(7),
//         height: theme.spacing(7),
//     },
//     listItem: {
//         paddingLeft: theme.spacing(4),
//         paddingRight: theme.spacing(4),
//     },
//     button: {
//         width: '80%',
//         margin: theme.spacing(2),
//     }
// }));
//
// const leaderboardData = [
//     { name: 'Louis Van George', points: 100, avatar: '/path/to/avatar.jpg' },
//     { name: 'Toniya', points: 89 },
//     { name: 'Mercedes', points: 80 },
//     { name: 'Tanisha', points: 79 },
//     { name: 'Manana', points: 76 },
// ];
//
// function TestLeaderBoard() {
//     const classes = useStyles();
//
//     return (
//         <Paper elevation={3}>
//             <Typography variant="h4" className={classes.title}>
//                 Leaderboard
//             </Typography>
//             <List className={classes.root}>
//                 {leaderboardData.map((user, index) => (
//                     <ListItem key={index} alignItems="flex-start" className={classes.listItem}>
//                         <ListItemAvatar>
//                             <Avatar alt={user.name} src={user.avatar} className={classes.avatar} />
//                         </ListItemAvatar>
//                         <ListItemText
//                             primary={`${index + 1}. ${user.name}`}
//                             secondary={
//                                 <React.Fragment>
//                                     <Typography
//                                         component="span"
//                                         variant="body2"
//                                         className={classes.inline}
//                                         color="textPrimary"
//                                     >
//                                         {`${user.points}pts`}
//                                     </Typography>
//                                 </React.Fragment>
//                             }
//                         />
//                     </ListItem>
//                 ))}
//             </List>
//             <AppBar position="fixed" color="default" className={classes.appBar}>
//                 <Toolbar>
//                     <Button variant="contained" color="primary" className={classes.button}>
//                         Continue
//                     </Button>
//                 </Toolbar>
//             </AppBar>
//         </Paper>
//     );
// }
//
// export default TestLeaderBoard;
