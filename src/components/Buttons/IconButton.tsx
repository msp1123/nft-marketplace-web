import classes from "./Buttons.module.sass";

type IconButtonProps = {
  icon: any;
  onClick?: any;
};

const IconButton = (props: IconButtonProps) => {
  return (
    <div>
      <button
        type="button"
        className={classes.iconButton}
        onClick={props.onClick}
      >
        <span className={classes.icon}>{props.icon}</span>
      </button>
    </div>
  );
};

export default IconButton;
