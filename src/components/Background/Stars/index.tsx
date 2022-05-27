import classes from './Stars.module.sass'

const StarsBg = () => {
  return (
    <div className={classes.main}>
        <div className={classes.stars}></div>
        <div className={classes.stars2}></div>
        <div className={classes.stars3}></div>
    </div>
  );
};

export default StarsBg;
