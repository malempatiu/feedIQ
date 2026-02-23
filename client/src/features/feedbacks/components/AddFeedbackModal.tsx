import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@ui/interactions/Input";
import { Textarea } from "@ui/interactions/Textarea";
import { Button } from "@ui/interactions/Button";
import { useCreateFeedback } from "../useCreateFeedback";
import { X } from "react-feather";
import Typography from "@ui/Typography";

const feedbackSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  detail: z.string().min(20, "Detail must be at least 20 characters"),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

type AddFeedbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddFeedbackModal = ({ isOpen, onClose }: AddFeedbackModalProps) => {
  const { createFeedback, isCreating, errorMessage } = useCreateFeedback();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = (data: FeedbackFormData) => {
    createFeedback(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center'>
        <DialogPanel className='bg-white rounded-lg p-8'>
          <div className='flex items-center justify-between mb-4'>
            <DialogTitle className='text-lg font-semibold text-slate-800'>
              Add New Feedback
            </DialogTitle>
            <button
              onClick={handleClose}
              className='text-slate-400 hover:bg-slate-400 hover:text-gray-200 rounded-lg p-2 transition-colors'
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
            <Input
              label='Feedback Title'
              error={errors.title?.message}
              description='Add a short, descriptive headline'
              {...register("title")}
            />

            <Textarea
              label='Feedback Detail'
              error={errors.detail?.message}
              description='Include any specific comments on what should be improved, added, etc.'
              {...register("detail")}
            />

            {errorMessage && <Typography variant='body2' className='text-red-600'>{errorMessage}</Typography>}

            <div className='flex justify-end gap-3 pt-4'>
              <Button
                type='button'
                variant='slate'
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='primary'
                disabled={isCreating}
                isPending={isCreating}
              >
                Add Feedback
              </Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export { AddFeedbackModal };
