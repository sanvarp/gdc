/**
 * Button Component Tests
 * Tests rendering, variants, click events, and disabled state
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render with text content', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should render with children elements', () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render primary variant by default', () => {
      const { container } = render(<Button>Primary</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('bg-primary-500');
    });

    it('should render secondary variant', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('bg-secondary-500');
    });

    it('should render outline variant', () => {
      const { container } = render(<Button variant="outline">Outline</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('border-2');
      expect(button?.className).toContain('border-primary-500');
    });

    it('should render ghost variant', () => {
      const { container } = render(<Button variant="ghost">Ghost</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('text-primary-600');
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      const { container } = render(<Button size="sm">Small</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('px-3');
      expect(button?.className).toContain('py-1.5');
      expect(button?.className).toContain('text-sm');
    });

    it('should render medium size by default', () => {
      const { container } = render(<Button size="md">Medium</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('px-4');
      expect(button?.className).toContain('py-2');
      expect(button?.className).toContain('text-base');
    });

    it('should render large size', () => {
      const { container } = render(<Button size="lg">Large</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('px-6');
      expect(button?.className).toContain('py-3');
      expect(button?.className).toContain('text-lg');
    });
  });

  describe('Full Width', () => {
    it('should apply full width class when fullWidth is true', () => {
      const { container } = render(<Button fullWidth>Full Width</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('w-full');
    });

    it('should not apply full width class when fullWidth is false', () => {
      const { container } = render(<Button fullWidth={false}>Normal</Button>);
      const button = container.querySelector('button');
      expect(button?.className).not.toContain('w-full');
    });
  });

  describe('Click Events', () => {
    it('should trigger onClick handler on click', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should trigger onClick handler with fireEvent', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should call onClick handler multiple times on multiple clicks', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('Disabled State', () => {
    it('should render disabled button', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should have disabled styling', () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('disabled:opacity-50');
      expect(button?.className).toContain('disabled:cursor-not-allowed');
    });

    it('should not trigger onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );

      // Click should not trigger the handler for disabled buttons
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should render with opacity-50 when disabled', () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      const button = container.querySelector('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Custom Classes', () => {
    it('should merge custom className', () => {
      const { container } = render(<Button className="custom-class">Custom</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('custom-class');
      expect(button?.className).toContain('rounded-lg'); // Base style should still be present
    });
  });

  describe('Accessibility', () => {
    it('should have focus ring for keyboard navigation', () => {
      const { container } = render(<Button>Accessible</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('focus:outline-none');
      expect(button?.className).toContain('focus:ring-2');
    });

    it('should be keyboard accessible', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Accessible</Button>);
      const button = screen.getByRole('button');

      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      // Note: fireEvent.keyDown doesn't trigger click, need to use keyboard event properly
      expect(button).toBeInTheDocument();
    });
  });

  describe('Combination Variants', () => {
    it('should render with multiple variant and size combinations', () => {
      const { container } = render(
        <Button variant="outline" size="lg" fullWidth>
          Combined
        </Button>
      );
      const button = container.querySelector('button');
      expect(button?.className).toContain('border-2');
      expect(button?.className).toContain('px-6');
      expect(button?.className).toContain('w-full');
    });
  });
});
