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
            <div className="flex flex-col gap-1 border-l-4 border-(--color-secondary) pl-3">
              <span className="text-xs text-(--color-icons) font-medium">Nome completo</span>
              {isEditing ? (
                <Input name="name" register={register} error={errors.name?.message} />
              ) : (
                <span className="text-sm font-semibold text-(--color-primary)">
                  {mockUser.name}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 border-l-4 border-(--color-secondary) pl-3">
              <span className="text-xs text-(--color-icons) font-medium">CPF</span>
              <span className="text-sm font-semibold text-(--color-primary)">{mockUser.cpf}</span>
              {isEditing && (
                <span className="text-xs text-gray-400">O CPF não pode ser alterado.</span>
              )}
            </div>

            <div className="flex flex-col gap-1 border-l-4 border-(--color-secondary) pl-3">
              <span className="text-xs text-(--color-icons) font-medium">Celular</span>
              {isEditing ? (
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
              ) : (
                <span className="text-sm font-semibold text-(--color-primary)">
                  {mockUser.phoneNumber}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 border-l-4 border-(--color-secondary) pl-3">
              <span className="text-xs text-(--color-icons) font-medium">E-mail</span>
              {isEditing ? (
                <Input
                  name="email"
                  register={register}
                  type="email"
                  error={errors.email?.message}
                />
              ) : (
                <span className="text-sm font-semibold text-(--color-primary)">
                  {mockUser.email}
                </span>
              )}
            </div>
          </div>
        </div>

        {!isEditing && (
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="w-36 h-10 bg-(--color-primary) text-white rounded-full flex items-center justify-center gap-2 cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
              Editar perfil
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-36 h-10 mx-auto bg-red-500 text-white rounded-full flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Excluir conta
            </button>
          </div>
        )}

        {isEditing && (
          <div className="flex justify-center gap-3 ">
            <button
              onClick={handleCancel}
              className="px-4 py-2 flex gap-1 bg-(--color-primary) text-white rounded-full text-sm font-medium cursor-pointer"
            >
              <X className="w-4 h-4 inline mr-1" />
              Cancelar
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-4 py-2 flex gap-1 bg-(--color-primary) text-white rounded-full text-sm font-medium cursor-pointer"
            >
              <Save className="w-4 h-4 inline mr-1" />
              Salvar
            </button>
          </div>
        )}

        <div className="sticky bottom-0 left-0 right-0">
          <Navbar />
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-6 w-70 flex flex-col items-center gap-4 shadow-lg">
            <h2 className="text-lg font-semibold text-(--color-primary)">Excluir conta</h2>
            <p className="text-sm text-gray-600 text-center">
              Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 h-10 border border-(--color-primary) text-(--color-primary) rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 h-10 bg-red-500 text-white rounded-lg cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
