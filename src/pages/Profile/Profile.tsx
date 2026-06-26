import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Pencil, Trash2, Save, X } from "lucide-react";
import { PatternFormat } from "react-number-format";

import { profileSchema } from "../../schemas/profile.schemas";
import type { ProfileFormData } from "../../schemas/profile.schemas";
import type { UserProfileType } from "../../api/types";

import { Input } from "../../components/Input/Input";
import { Navbar } from "../../components/Navbar/Navbar";
import { ProfileField } from "../../components/ProfileField/ProfileField";
import { Button } from "../../components/Button/Button";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";

import logo from "../../assets/icons/icon-ibuss.svg";

// Mock dos dados do usuário — substituir pela chamada à API
const mockUser: UserProfileType = {
  id: 1,
  name: "Maria da Silva",
  cpf: "12345678910",
  email: "mariadasilva@email.com",
  phoneNumber: "+5521999095555",
};

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: mockUser.name,
      email: mockUser.email,
      phoneNumber: mockUser.phoneNumber,
    },
  });

  function onSubmit(data: ProfileFormData) {
    // eslint-disable-next-line no-console
    console.log(data);
    // TODO: integrar com API de atualização de perfil
    setIsEditing(false);
  }

  function handleCancel() {
    reset();
    setIsEditing(false);
  }

  function handleDeleteAccount() {
    // TODO: integrar com API de exclusão de conta
    setShowDeleteModal(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-97.5 min-h-screen flex flex-col gap-4 bg-(--color-background) shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-3xl overflow-y-auto relative">
        <div className="px-6 pt-5 flex items-center justify-between">
          <img src={logo} alt="Logo iBuss" className="w-20" />
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-(--color-icons) flex items-center justify-center bg-white">
              {mockUser.photo ? (
                <img
                  src={mockUser.photo}
                  alt="Foto de perfil"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-(--color-icons)" />
              )}
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-(--color-icons) rounded-full flex items-center justify-center cursor-pointer">
              <Pencil className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>

        <div className="px-10">
          <div
            className={`bg-white rounded-2xl shadow p-3 flex flex-col ${isEditing ? "gap-3" : "gap-6"}`}
          >
            <ProfileField
              label="Nome completo"
              value={mockUser.name}
              isEditing={isEditing}
              editContent={<Input name="name" register={register} error={errors.name?.message} />}
            />

            <ProfileField
              label="CPF"
              value={mockUser.cpf}
              isEditing={isEditing}
              helperText="O CPF não pode ser alterado."
            />

            <ProfileField
              label="Celular"
              value={mockUser.phoneNumber}
              isEditing={isEditing}
              editContent={
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <PatternFormat
                      format="(##) #####-####"
                      mask="_"
                      customInput={Input}
                      getInputRef={ref}
                      name="phoneNumber"
                      value={value}
                      onValueChange={(values) => onChange(values.value)}
                      error={errors.phoneNumber?.message}
                    />
                  )}
                />
              }
            />

            <ProfileField
              label="E-mail"
              value={mockUser.email}
              isEditing={isEditing}
              editContent={
                <Input
                  name="email"
                  register={register}
                  type="email"
                  error={errors.email?.message}
                />
              }
            />
          </div>
        </div>

        {!isEditing && (
          <div className="flex justify-center gap-3">
            <Button
              variant="primary"
              icon={<Pencil className="w-4 h-4" />}
              className="w-36 h-10"
              onClick={() => setIsEditing(true)}
            >
              Editar perfil
            </Button>
            <Button
              variant="danger"
              icon={<Trash2 className="w-4 h-4" />}
              className="w-36 h-10 mx-auto"
              onClick={() => setShowDeleteModal(true)}
            >
              Excluir conta
            </Button>
          </div>
        )}

        {isEditing && (
          <div className="flex justify-center gap-3">
            <Button
              variant="primary"
              icon={<X className="w-4 h-4" />}
              className="px-4 py-2 text-sm font-medium"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              icon={<Save className="w-4 h-4" />}
              className="px-4 py-2 text-sm font-medium"
              onClick={handleSubmit(onSubmit)}
            >
              Salvar
            </Button>
          </div>
        )}

        <div className="sticky bottom-0 left-0 right-0">
          <Navbar />
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmModal
          title="Excluir conta"
          message="Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita."
          confirmLabel="Excluir"
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
