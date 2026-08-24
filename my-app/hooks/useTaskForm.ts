import { useState } from 'react';
import { TaskInput } from '@/types/Task';

interface UseTaskFormReturn {
    formData: TaskInput;
    setFormData:(data: TaskInput) => void;
    resetForm: () => void;
    getFormData: () => TaskInput;
}

export const useTaskForm = (): UseTaskFormReturn => {
    const [formData, setFormData] = useState<TaskInput>({
        title: '',
        description: ''
    })

    const resetForm = (): void => {
        setFormData({
            title: '',
            description: ''
        })
    }

    const getFormData = (): TaskInput => {
        const { title, description } = formData;

        return { title: title.trim(), description: description?.trim() || undefined };
    }

    return {
        formData,
        setFormData,
        resetForm,
        getFormData
    }

}