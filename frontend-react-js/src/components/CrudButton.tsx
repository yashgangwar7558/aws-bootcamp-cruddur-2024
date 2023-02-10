import "./CrudButton.css";

export default function CrudButton(props: any) {
  const pop_activities_form = () => {
    props.setPopped(true);
  };

  return (
    <button onClick={pop_activities_form} className="post">
      Crud
    </button>
  );
}
