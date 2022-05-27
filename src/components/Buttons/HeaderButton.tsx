import classes from "./Buttons.module.sass";

type HeaderButtonProps = {
  label: string;
  onClick?: any;
};

const HeaderButton = (props: HeaderButtonProps) => {
  return (
    <div>
      <div
        className={classes.headerButton}
        onClick={props.onClick}
      >
      <span>{props.label} </span>
      </div>
    </div>
  );
};

export default HeaderButton;
