import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// バリデーションスキーマ
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
  inquiryType: z.enum(["estimate", "consultation", "other"], {
    message: "お問い合わせ種別を選択してください",
  }),
  address: z.string().optional(),
  message: z.string().min(1, "お問い合わせ内容を入力してください"),
  privacy: z.boolean().refine((val) => val === true, {
    message: "プライバシーポリシーに同意してください",
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // サーバーサイドバリデーション
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          message: "入力内容に誤りがあります",
          errors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // ここでメール送信処理を実装
    // 本番環境では以下のいずれかを使用：
    // - Resend (https://resend.com)
    // - SendGrid
    // - AWS SES
    // - Nodemailer + SMTP

    // 開発環境ではコンソールに出力
    console.log("=== お問い合わせ受信 ===");
    console.log("お名前:", data.name);
    console.log("ふりがな:", data.furigana || "-");
    console.log("電話番号:", data.phone);
    console.log("メール:", data.email);
    console.log("種別:", data.inquiryType);
    console.log("住所:", data.address || "-");
    console.log("内容:", data.message);
    console.log("========================");

    // 成功レスポンス
    return NextResponse.json(
      {
        success: true,
        message: "お問い合わせを受け付けました",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "サーバーエラーが発生しました。時間をおいて再度お試しください。",
      },
      { status: 500 }
    );
  }
}

// GETリクエストは許可しない
export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: 405 }
  );
}
