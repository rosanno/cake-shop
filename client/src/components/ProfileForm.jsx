import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useGetUserQuery, useUpdateUserMutation } from "../services/cakeApi";
import Button from "../components/ui/Button";
import Input from "./ui/Input";

const ProfileForm = () => {
  const { data } = useGetUserQuery();
  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (data) {
      setValue("name", data?.user?.name);
      setValue("address", data?.user?.addresses[0].address);
      setValue("phone", data?.user?.phone);
      setValue("email", data?.user?.email);
    }
  }, [data]);

  const onSubmit = async (data) => {
    const response = await updateProfile({ data });
    if (response) {
      toast.success("info updated", {
        style: {
          fontSize: "13px",
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="md:w-96">
        <Input
          label="Name"
          type="text"
          register={register}
          errors={errors}
          name="name"
        />
      </div>
      <div className="md:w-96 mt-2">
        <Input
          label="Address"
          type="text"
          register={register}
          errors={errors}
          name="address"
        />
      </div>
      <div className="md:w-96 mt-2">
        <Input
          label="Phone #"
          type="number"
          register={register}
          errors={errors}
          name="phone"
        />
      </div>
      <div className="md:w-96 mt-2">
        <Input
          label="Email"
          type="email"
          register={register}
          errors={errors}
          name="email"
        />
      </div>
      <div className="mt-5">
        <Button
          type="submit"
          variant="danger"
          className="w-16"
          disabled={isUpdateLoading}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
