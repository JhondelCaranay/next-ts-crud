import { AddUser, UpdateUser } from ".";
import { useAppSelector } from "../redux/hooks";

const Form = () => {
  const formId = useAppSelector((state) => state.toggleForm.formId);

  return (
    <div className="container mx-auto py-5">
      {formId ? <UpdateUser userId={formId} /> : <AddUser />}
    </div>
  );
};
export default Form;
