"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  furigana: z.string().optional(),
  phone: z
    .string()
    .min(1, "電話番号を入力してください")
    .regex(/^[0-9\-]+$/, "電話番号の形式が正しくありません"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("メールアドレスの形式が正しくありません"),
  inquiryType: z
    .enum(["estimate", "consultation", "other"])
    .refine((val) => val !== undefined, {
      message: "お問い合わせ種別を選択してください",
    }),
  address: z.string().optional(),
  message: z.string().min(1, "お問い合わせ内容を入力してください"),
  privacy: z
    .boolean()
    .refine((val) => val === true, {
      message: "プライバシーポリシーに同意してください",
    }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/contact/thanks");
      } else {
        // サーバーサイドバリデーションエラー
        alert(result.message || "送信に失敗しました。入力内容をご確認ください。");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("通信エラーが発生しました。時間をおいて再度お試しください。");
      setIsSubmitting(false);
    }
  };

  const inputBaseClass =
    "w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";
  const labelClass = "block text-base font-semibold text-primary mb-2";
  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* お名前 */}
      <div>
        <label htmlFor="name" className={labelClass}>
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="例）山田 太郎"
          className={`${inputBaseClass} ${errors.name ? "border-red-500" : ""}`}
          {...register("name")}
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      {/* ふりがな */}
      <div>
        <label htmlFor="furigana" className={labelClass}>
          ふりがな
        </label>
        <input
          id="furigana"
          type="text"
          placeholder="例）やまだ たろう"
          className={inputBaseClass}
          {...register("furigana")}
        />
      </div>

      {/* 電話番号 */}
      <div>
        <label htmlFor="phone" className={labelClass}>
          電話番号 <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="例）090-1234-5678"
          className={`${inputBaseClass} ${errors.phone ? "border-red-500" : ""}`}
          {...register("phone")}
        />
        {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
      </div>

      {/* メールアドレス */}
      <div>
        <label htmlFor="email" className={labelClass}>
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="例）example@example.com"
          className={`${inputBaseClass} ${errors.email ? "border-red-500" : ""}`}
          {...register("email")}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      {/* お問い合わせ種別 */}
      <div>
        <p className={labelClass}>
          お問い合わせ種別 <span className="text-red-500">*</span>
        </p>
        <div className="space-y-3 mt-3">
          {[
            { value: "estimate", label: "無料見積もり依頼" },
            { value: "consultation", label: "相談・質問" },
            { value: "other", label: "その他" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                value={option.value}
                className="w-5 h-5 text-primary accent-primary cursor-pointer"
                {...register("inquiryType")}
              />
              <span className="text-text">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.inquiryType && (
          <p className={errorClass}>{errors.inquiryType.message}</p>
        )}
      </div>

      {/* ご住所 */}
      <div>
        <label htmlFor="address" className={labelClass}>
          ご住所（市区町村まで）
        </label>
        <input
          id="address"
          type="text"
          placeholder="例）〇〇市〇〇町"
          className={inputBaseClass}
          {...register("address")}
        />
        <p className="text-sm text-text-muted mt-1">
          ※お見積もり依頼の場合はご入力をお願いします
        </p>
      </div>

      {/* お問い合わせ内容 */}
      <div>
        <label htmlFor="message" className={labelClass}>
          お問い合わせ内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="ご相談内容をご記入ください"
          className={`w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-y min-h-[150px] ${
            errors.message ? "border-red-500" : ""
          }`}
          {...register("message")}
        />
        {errors.message && (
          <p className={errorClass}>{errors.message.message}</p>
        )}
      </div>

      {/* プライバシーポリシー同意 */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 mt-0.5 accent-primary cursor-pointer"
            {...register("privacy")}
          />
          <span className="text-text">
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              プライバシーポリシー
            </a>
            に同意する
          </span>
        </label>
        {errors.privacy && (
          <p className={errorClass}>{errors.privacy.message}</p>
        )}
      </div>

      {/* 送信ボタン */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-80 md:mx-auto md:block h-14 bg-accent hover:bg-accent-dark text-white text-lg font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              送信中...
            </>
          ) : (
            "送信する"
          )}
        </button>
      </div>
    </form>
  );
}
