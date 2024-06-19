<script setup lang="ts">
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import 'filepond/dist/filepond.min.css'
import { ref, watch } from 'vue'
import vueFilePond from 'vue-filepond'
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)

const props = withDefaults(
  defineProps<{
    name?: string
    label?: string
    acceptedFileTypes?: string
    modelValue?: File[]
    allowMultiple?: boolean
  }>(),
  {
    name: 'file',
    label: 'الصور',
    acceptedFileTypes: '*',
    allowMultiple: false
  }
)

const initialFiles = ref(props.modelValue ?? [])
const filesTracker = ref(props.modelValue ?? [])

const compareFiles = (files1: File[], files2: File[]): boolean => {
  if (files1.length !== files2.length) {
    return false
  }

  for (let i = 0; i < files1.length; i++) {
    const file1 = files1[i]
    const file2 = files2.find((file) => file.name === file1.name)

    if (!file2) {
      return false
    }

    if (file1.size !== file2.size || file1.type !== file2.type) {
      return false
    }
  }

  return true
}

const emit = defineEmits<{
  'update:modelValue': [value: File[]]
}>()

const onUpdateFiles = (fileItems: File[]) => {
  const files = fileItems.map((fileItem: any) => fileItem.file as File)
  if (compareFiles(files, filesTracker.value)) {
    return
  }
  filesTracker.value = files
  emit('update:modelValue', files)
}

watch(
  () => props.modelValue,
  (images) => {
    if (compareFiles(images ?? [], filesTracker.value)) {
      return
    }
    filesTracker.value = images ?? []
    initialFiles.value = images ?? []
  },
  { immediate: true }
)

const labelIdle = `اسحب ${props.label} الى هنا أو <span class="filepond--label-action">استعرض</span>`
const labelInvalidField = 'الملف غير صالح'
const labelFileWaitingForSize = 'انتظر حتى يتم حساب حجم الملف'
const labelFileSizeNotAvailable = 'حجم الملف غير متوفر'
const labelFileLoading = 'جاري التحميل'
const labelFileLoadError = 'حدث خطأ أثناء التحميل'
const labelFileProcessing = 'جاري المعالجة'
const labelFileProcessingComplete = 'تمت المعالجة'
const labelFileProcessingAborted = 'تم إيقاف المعالجة'
const labelFileProcessingError = 'حدث خطأ أثناء المعالجة'
const labelFileProcessingRevertError = 'حدث خطأ أثناء التراجع'
const labelFileRemoveError = 'حدث خطأ أثناء الحذف'
const labelTapToCancel = 'اضغط للإلغاء'
const labelTapToRetry = 'اضغط لإعادة المحاولة'
const labelTapToUndo = 'اضغط للتراجع'
const labelButtonRemoveItem = 'حذف'
const labelButtonAbortItemLoad = 'إيقاف'
const labelButtonRetryItemLoad = 'إعادة'
const labelButtonAbortItemProcessing = 'إيقاف'
const labelButtonUndoItemProcessing = 'تراجع'
const labelButtonRetryItemProcessing = 'إعادة'
const labelButtonProcessItem = 'تأكيد'
</script>

<template>
  <file-pond
    :label-invalid-field="labelInvalidField"
    :label-file-waiting-for-size="labelFileWaitingForSize"
    :label-file-size-not-available="labelFileSizeNotAvailable"
    :label-file-loading="labelFileLoading"
    :label-file-load-error="labelFileLoadError"
    :label-file-processing="labelFileProcessing"
    :label-file-processing-complete="labelFileProcessingComplete"
    :label-file-processing-aborted="labelFileProcessingAborted"
    :label-file-processing-error="labelFileProcessingError"
    :label-file-processing-revert-error="labelFileProcessingRevertError"
    :label-file-remove-error="labelFileRemoveError"
    :label-tap-to-cancel="labelTapToCancel"
    :label-tap-to-retry="labelTapToRetry"
    :label-tap-to-undo="labelTapToUndo"
    :label-button-remove-item="labelButtonRemoveItem"
    :label-button-abort-item-load="labelButtonAbortItemLoad"
    :label-button-retry-item-load="labelButtonRetryItemLoad"
    :label-button-abort-item-processing="labelButtonAbortItemProcessing"
    :label-button-undo-item-processing="labelButtonUndoItemProcessing"
    :label-button-retry-item-processing="labelButtonRetryItemProcessing"
    :label-button-process-item="labelButtonProcessItem"
    :name="name"
    :accepted-file-types="acceptedFileTypes"
    :label-idle="labelIdle"
    :files="initialFiles"
    :allow-multiple="allowMultiple"
    @updatefiles="onUpdateFiles"
  />
</template>
