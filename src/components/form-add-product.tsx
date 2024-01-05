"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormAlert } from "./form-alert"
import { FormButton } from "./form-button"
import { useFormState } from "react-dom"
import { addProduct } from "@/actions/product"

const FormAddProduct = () => {
  const [state, formAction] = useFormState(addProduct, null)

  return (
    <form action={formAction} className="space-y-2 pb-4">
      <FormAlert success={state?.success} message={state?.message} />
      <div>
        <Label htmlFor="name">Nama produk</Label>
        <Input type="text" name="name" id="name" placeholder="Nama produk" />
      </div>
      <div>
        <Label htmlFor="description">Deskripsi produk (opsional)</Label>

        <Input
          type="text"
          name="description"
          id="description"
          placeholder="Deskripsi produk (opsional)"
        />
      </div>
      <div>
        <Label htmlFor="estimated">Estimasi pengerjaan</Label>
        <Input
          type="text"
          name="estimated"
          id="estimated"
          placeholder="Estimasi pengerjaan"
        />
      </div>
      <div>
        <Label htmlFor="price">Harga per 1kg</Label>
        <Input
          type="text"
          name="price"
          id="price"
          placeholder="Harga per 1kg"
        />
      </div>
      <div>
        <Label htmlFor="file">Upload gambar</Label>
        <Input type="file" accept="image/*" name="file" id="file" />
      </div>
      <FormButton text="Tambah" />
    </form>
  )
}

export default FormAddProduct
