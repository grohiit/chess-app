import { Text, type TextProps } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'

export type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'
}

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  className,
  ...rest
}: ThemedTextProps & { className?: string }) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  const getTypeClass = () => {
    switch (type) {
      case 'default':
        return 'text-base leading-6'
      case 'defaultSemiBold':
        return 'text-base leading-6 font-semibold'
      case 'title':
        return 'text-3xl font-bold leading-8'
      case 'subtitle':
        return 'text-xl font-bold'
      case 'link':
        return 'leading-[30px] text-base text-[#0a7ea4]'
      default:
        return 'text-base leading-6'
    }
  }

  return (
    <Text
      style={[{ color }, style]}
      className={`${getTypeClass()} ${className || ''}`}
      {...rest}
    />
  )
}
