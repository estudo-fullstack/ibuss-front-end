import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash2, Save, X, Loader2 } from "lucide-react";
import { PatternFormat } from "react-number-format";

import { profileSchema } from "../../schemas/profile.schemas";
import type { ProfileFormData } from "../../schemas/profile.schemas";
import { getUserProfile, updateUserAvatar, updateUserProfile } from "../../api/user.api";

import { isValidAvatarId } from "../../assets/avatars";
import type { AvatarId } from "../../assets/avatars";

import { Input } from "../../components/Input/Input";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { ProfileField } from "../../components/ProfileField/ProfileField";
import { Button } from "../../components/Button/Button";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { Avatar } from "../../components/Avatar/Avatar";
import { AvatarPicker } from "../../components/AvatarPicker/AvatarPicker";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pendingAvatarId, setPendingAvatarId] = useState<AvatarId | null>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", email: "", phoneNumber: "" },
  });

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user, reset]);

  const rawAvatarId = user?.avatarId;
  const serverAvatarId = isValidAvatarId(rawAvatarId) ? rawAvatarId : null;

  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    onMutate: () => {
      setSubmitError(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setShowAvatarModal(false);
      setSuccessMessage("Perfil atualizado com sucesso!");
      setSuccess(true);
      setIsEditing(false);
    },
    onError: (err) => {
      if (typeof err.message === "string") {
        setSubmitError(err.message);
        return;
      }
      setSubmitError("Não foi possível atualizar o perfil. Tente novamente.");
    },
  });

  const updateAvatarMutation = useMutation({
    mutationFn: updateUserAvatar,
    onMutate: () => {
      setSubmitError(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setShowAvatarModal(false);
      setSuccessMessage("Avatar atualizado com sucesso!");
      setSuccess(true);
    },
    onError: (err) => {
      if (typeof err.message === "string") {
        setSubmitError(err.message);
        return;
      }
      setSubmitError("Não foi possível atualizar o avatar. Tente novamente.");
    },
  });

  function onSubmit(data: ProfileFormData) {
    updateMutation.mutate(data);
  }

  function handleCancel() {
    reset({
      name: user?.name ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
    });
    setIsEditing(false);
  }

  function handleOpenAvatarModal() {
    setSubmitError(null);
    setPendingAvatarId(serverAvatarId);
    setShowAvatarModal(true);
  }

  function handleSaveAvatar() {
    if (!pendingAvatarId) {
      return;
    }

    updateAvatarMutation.mutate({ avatarId: pendingAvatarId });
  }

  function handleDeleteAccount() {
    setShowDeleteModal(false);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-(--color-primary)" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500">
          {typeof error?.message === "string"
            ? error.message
            : "Erro ao carregar perfil."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-97.5 min-h-screen flex flex-col gap-4 bg-(--color-background) shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-3xl overflow-y-auto relative">
        <Header />

        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-(--color-icons) flex items-center justify-center bg-white overflow-hidden">
              <Avatar
                avatarId={serverAvatarId}
                size={96}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleOpenAvatarModal}
              aria-label="Alterar avatar"
              className="absolute bottom-0 right-0 w-7 h-7 bg-(--color-icons) rounded-full flex items-center justify-center cursor-pointer"
            >
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
              value={user?.name ?? ""}
              isEditing={isEditing}
              editContent={<Input name="name" register={register} error={errors.name?.message} />}
            />

            <ProfileField
              label="CPF"
              value={user?.cpf ?? ""}
              isEditing={isEditing}
              helperText="O CPF não pode ser alterado."
            />

            <ProfileField
              label="Celular"
              value={user?.phoneNumber ?? ""}
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
              value={user?.email ?? ""}
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

        {submitError && !showAvatarModal && (
          <p className="px-10 text-sm text-red-500 text-center">{submitError}</p>
        )}

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
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Salvando..." : "Salvar"}
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

      {showAvatarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm max-h-[80vh] overflow-y-auto flex flex-col gap-4 shadow-lg">
            <h2 className="text-lg font-semibold text-(--color-primary) text-center">
              Escolha seu avatar
            </h2>

            <AvatarPicker selectedId={pendingAvatarId} onSelect={setPendingAvatarId} />

            {submitError && (
              <p className="text-sm text-red-500 text-center">{submitError}</p>
            )}

            <div className="flex justify-center gap-3">
              <Button
                variant="primary"
                icon={<X className="w-4 h-4" />}
                className="px-4 py-2 text-sm font-medium"
                onClick={() => setShowAvatarModal(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                icon={<Save className="w-4 h-4" />}
                className="px-4 py-2 text-sm font-medium"
                onClick={handleSaveAvatar}
                disabled={
                  updateAvatarMutation.isPending ||
                  pendingAvatarId === null ||
                  pendingAvatarId === serverAvatarId
                }
              >
                {updateAvatarMutation.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-6 w-70 flex flex-col items-center gap-4 shadow-lg">
            <h2 className="text-lg font-semibold text-(--color-primary)">Sucesso!</h2>
            <p className="text-sm text-gray-600 text-center">
              {successMessage ?? "Operação realizada com sucesso!"}
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                setSuccessMessage(null);
              }}
              className="mt-2 w-full h-10 bg-(--color-primary) text-white rounded-lg cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
