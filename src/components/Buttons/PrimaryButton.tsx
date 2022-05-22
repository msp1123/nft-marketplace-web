import classes from "../../styles/Buttons.module.sass";

type PrimaryButtonProps = {
  label: any;
  onClick?: any;
};

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <button className={classes.primaryButton} onClick={props.onClick}>
      {props.label}
    </button>
  );
};

export default PrimaryButton;
