import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-workspace',
  imports: [
    CommonModule,
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent implements AfterViewInit {
  @ViewChild('workspace') workspaceElement!: ElementRef;

  isPlaying = false;
  playbackPosition = 0;
  gridLines: number[] = [];
  workspaceHeight = 0;
  private animationFrameId: number | null = null;

  ngAfterViewInit() {
    this.workspaceHeight = this.workspaceElement.nativeElement.clientHeight;
    this.createGridLines();
  }

  @HostListener('window:resize')
  onResize() {
    this.workspaceHeight = this.workspaceElement.nativeElement.clientHeight;
    this.createGridLines();
  }

  createGridLines() {
    this.gridLines = Array.from(
      { length: Math.floor(this.workspaceHeight / 50) },
      (_, i) => i * 50
    );
  }

  handleWorkspaceClick(event: MouseEvent) {
    const rect = this.workspaceElement.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log('Note position:', { x, y });
  }

  togglePlayback() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startPlayback();
    } else {
      this.stopPlayback();
    }
  }

  private startPlayback() {
    const animate = () => {
      this.playbackPosition += 2;
      if (this.playbackPosition > this.workspaceElement.nativeElement.clientWidth) {
        this.playbackPosition = 0;
      }
      if (this.isPlaying) {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };
    animate();
  }

  private stopPlayback() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.playbackPosition = 0;
  }

  clear() {
    // TODO: Clear all notes
    console.log('Clearing workspace');
  }
}
