import classes from "./Buttons.module.sass";

type IconTextButtonProps = {
  label: string;
  icon: any;
  onClick?: any;
  showText: boolean;
};

const IconTextButton = (props: IconTextButtonProps) => {
  return (
    <div>
      <button
        type="button"
        className={classes.iconButton}
        onClick={props.onClick}
      >
        <span className={classes.icon}>{props.icon}</span>
        <span
          className={classes.label}
          style={props.showText ? {} : { display: "none" }}
        >
          {props.label}
        </span>
      </button>
    </div>
  );
};

export default IconTextButton;
