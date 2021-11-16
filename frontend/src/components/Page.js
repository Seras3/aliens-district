import { Grid } from "@mui/material";

const style = {
  backgroundImage: 'url(/img/background.jpg)',
}


function Page(props) {
  return (
    <Grid
      style={style}
      minHeight='100vh'
      paddingTop={props.paddingTop ?? 0}
      container
      alignContent="flex-start"
    >
      {props.children}
    </Grid>
  );
}

export default Page;