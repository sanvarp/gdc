/**
 * Card Component Tests
 * Tests Card and its subcomponents (Header, Content, Footer)
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardContent, CardFooter } from './Card';

describe('Card Component', () => {
  describe('Card Base', () => {
    it('should render card with children', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should have correct base styles', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector('div');
      expect(card?.className).toContain('bg-white');
      expect(card?.className).toContain('rounded-lg');
      expect(card?.className).toContain('border');
      expect(card?.className).toContain('shadow-sm');
    });

    it('should apply forward ref correctly', () => {
      const ref = { current: null };
      render(
        <Card ref={ref as any}>
          Content
        </Card>
      );
      expect(ref.current).toBeTruthy();
      expect(ref.current?.className).toContain('bg-white');
    });
  });

  describe('Padding Variants', () => {
    it('should have no padding when padding="none"', () => {
      const { container } = render(<Card padding="none">Content</Card>);
      const card = container.querySelector('div');
      expect(card?.className).not.toContain('p-');
    });

    it('should have small padding by default', () => {
      const { container } = render(<Card padding="sm">Content</Card>);
      const card = container.querySelector('div');
      expect(card?.className).toContain('p-3');
    });

    it('should have medium padding by default', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector('div');
      expect(card?.className).toContain('p-4');
    });

    it('should have large padding when padding="lg"', () => {
      const { container } = render(<Card padding="lg">Content</Card>);
      const card = container.querySelector('div');
      expect(card?.className).toContain('p-6');
    });
  });

  describe('Hover Effect', () => {
    it('should not have hover effect by default', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector('div');
      expect(card?.className).not.toContain('hover:shadow-md');
    });

    it('should have hover effect when hover=true', () => {
      const { container } = render(<Card hover>Content</Card>);
      const card = container.querySelector('div');
      expect(card?.className).toContain('hover:shadow-md');
    });

    it('should not have hover effect when hover=false', () => {
      const { container } = render(<Card hover={false}>Content</Card>);
      const card = container.querySelector('div');
      expect(card?.className).not.toContain('hover:shadow-md');
    });
  });

  describe('Custom Classes', () => {
    it('should merge custom className with base styles', () => {
      const { container } = render(<Card className="custom-class">Content</Card>);
      const card = container.querySelector('div');
      expect(card?.className).toContain('custom-class');
      expect(card?.className).toContain('bg-white');
    });
  });

  describe('CardHeader', () => {
    it('should render card header with children', () => {
      render(<CardHeader>Header content</CardHeader>);
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('should have correct header styles', () => {
      const { container } = render(<CardHeader>Header</CardHeader>);
      const header = container.querySelector('div');
      expect(header?.className).toContain('mb-4');
      expect(header?.className).toContain('pb-3');
      expect(header?.className).toContain('border-b');
    });

    it('should apply custom className to header', () => {
      const { container } = render(<CardHeader className="custom-header">Header</CardHeader>);
      const header = container.querySelector('div');
      expect(header?.className).toContain('custom-header');
    });

    it('should apply forward ref to header', () => {
      const ref = { current: null };
      render(
        <CardHeader ref={ref as any}>
          Header
        </CardHeader>
      );
      expect(ref.current).toBeTruthy();
      expect(ref.current?.className).toContain('mb-4');
    });
  });

  describe('CardContent', () => {
    it('should render card content with children', () => {
      render(<CardContent>Main content</CardContent>);
      expect(screen.getByText('Main content')).toBeInTheDocument();
    });

    it('should have correct content structure', () => {
      const { container } = render(<CardContent>Content</CardContent>);
      const content = container.querySelector('div');
      expect(content).toBeInTheDocument();
    });

    it('should apply custom className to content', () => {
      const { container } = render(<CardContent className="custom-content">Content</CardContent>);
      const content = container.querySelector('div');
      expect(content?.className).toContain('custom-content');
    });

    it('should apply forward ref to content', () => {
      const ref = { current: null };
      render(
        <CardContent ref={ref as any}>
          Content
        </CardContent>
      );
      expect(ref.current).toBeTruthy();
    });
  });

  describe('CardFooter', () => {
    it('should render card footer with children', () => {
      render(<CardFooter>Footer content</CardFooter>);
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('should have correct footer styles', () => {
      const { container } = render(<CardFooter>Footer</CardFooter>);
      const footer = container.querySelector('div');
      expect(footer?.className).toContain('mt-4');
      expect(footer?.className).toContain('pt-3');
      expect(footer?.className).toContain('border-t');
    });

    it('should apply custom className to footer', () => {
      const { container } = render(<CardFooter className="custom-footer">Footer</CardFooter>);
      const footer = container.querySelector('div');
      expect(footer?.className).toContain('custom-footer');
    });

    it('should apply forward ref to footer', () => {
      const ref = { current: null };
      render(
        <CardFooter ref={ref as any}>
          Footer
        </CardFooter>
      );
      expect(ref.current).toBeTruthy();
      expect(ref.current?.className).toContain('mt-4');
    });
  });

  describe('Complete Card Structure', () => {
    it('should render complete card with header, content, and footer', () => {
      render(
        <Card>
          <CardHeader>Card Title</CardHeader>
          <CardContent>Main card content goes here</CardContent>
          <CardFooter>Card footer</CardFooter>
        </Card>
      );

      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Main card content goes here')).toBeInTheDocument();
      expect(screen.getByText('Card footer')).toBeInTheDocument();
    });

    it('should render card with only header and content', () => {
      render(
        <Card>
          <CardHeader>Title</CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should render card with only content and footer', () => {
      render(
        <Card>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });

  describe('Complex Content', () => {
    it('should render card with nested elements', () => {
      render(
        <Card>
          <CardHeader>
            <h2>Title</h2>
          </CardHeader>
          <CardContent>
            <p>Paragraph content</p>
            <button>Action</button>
          </CardContent>
          <CardFooter>
            <span>Info</span>
          </CardFooter>
        </Card>
      );

      expect(screen.getByRole('heading', { name: /title/i })).toBeInTheDocument();
      expect(screen.getByText('Paragraph content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
      expect(screen.getByText('Info')).toBeInTheDocument();
    });

    it('should render card with multiple content elements', () => {
      render(
        <Card hover padding="lg">
          <CardHeader>Multi-section Card</CardHeader>
          <CardContent>
            <div>Section 1</div>
            <div>Section 2</div>
          </CardContent>
          <CardFooter>
            <button>Save</button>
            <button>Cancel</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText('Multi-section Card')).toBeInTheDocument();
      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.getByText('Section 2')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('should accept and pass through HTML attributes', () => {
      const { container } = render(
        <Card data-testid="custom-card" id="card-1" role="article">
          Content
        </Card>
      );

      const card = screen.getByTestId('custom-card');
      expect(card).toHaveAttribute('id', 'card-1');
      expect(card).toHaveAttribute('role', 'article');
    });

    it('should accept aria attributes on subcomponents', () => {
      const { container } = render(
        <Card>
          <CardHeader aria-label="Card header label">Header</CardHeader>
          <CardContent role="main">Content</CardContent>
        </Card>
      );

      expect(screen.getByLabelText('Card header label')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });
});
