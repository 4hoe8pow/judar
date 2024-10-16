import { useEffect, useState } from 'react'

export function useForm(initialState: Record<string, string>) {
	const [formData, setFormData] = useState(initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target
		setFormData((prevData) => ({ ...prevData, [name]: value }))
	}

	// バリデーション
	useEffect(() => {
		const newErrors: Record<string, string> = {}

		// 名前（50文字）
		const namePattern =
			/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}A-Za-z]+(?:[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}A-Za-z\s]*[^\s])?$/u

		if (!formData.name) {
			newErrors.name = 'Name is required'
		} else if (formData.name.length < 2 || formData.name.length > 50) {
			newErrors.name = 'Name must be between 2 and 50 characters'
		} else if (!namePattern.test(formData.name)) {
			newErrors.name =
				'Name can only contain letters, spaces, and Japanese characters, but no trailing spaces'
		}

		// メールアドレス（正規表現）
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!formData.email) {
			newErrors.email = 'Email is required'
		} else if (!emailPattern.test(formData.email)) {
			newErrors.email = 'Email is invalid'
		}

		// メッセージ（10〜500文字）
		if (!formData.message) {
			newErrors.message = 'Message is required'
		} else if (
			formData.message.length < 10 ||
			formData.message.length > 500
		) {
			newErrors.message = 'Message must be between 10 and 500 characters'
		}

		setErrors(newErrors)
	}, [formData])

	return { formData, errors, handleChange, isSubmitting, setIsSubmitting }
}
